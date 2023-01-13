import { mapState } from 'vuex'
import { quotation } from '@/utils/dataTemp'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      'InsuranceActive': state => state.quotationStep1.InsuranceActive,
    })
  },
  methods: {
    AssignQuestionnaire(type) {
      if (this.quotationData.questionnaire) {
        this.$store.dispatch(`${type}/updateQuestionnaireFinished`, true)
        let data = null
        if (type === 'place') {
          data = {
            ...this.quotationData.questionnaire,
            part1: {
              ...this.quotationData.questionnaire.part1,
              createTime: this.quotationData.questionnaire.part1.createTime ? {
                year: this.quotationData.questionnaire.part1.createTime.split('T')[0].split('-')[0] - 1911,
                month: this.quotationData.questionnaire.part1.createTime.split('T')[0].split('-')[1],
                day: this.quotationData.questionnaire.part1.createTime.split('T')[0].split('-')[2],
              } : { year: '', month: '', day: '', },
              businessStartDate: this.quotationData.questionnaire.part1.businessStartDate ? {
                hours: this.quotationData.questionnaire.part1.businessStartDate.split('T')[1].split(':')[0],
                minutes: this.quotationData.questionnaire.part1.businessStartDate.split('T')[1].split(':')[1],
              } : { hours: '00', minutes: '00' },
              businessEndDate: this.quotationData.questionnaire.part1.businessEndDate ? {
                hours: this.quotationData.questionnaire.part1.businessEndDate.split('T')[1].split(':')[0],
                minutes: this.quotationData.questionnaire.part1.businessEndDate.split('T')[1].split(':')[1],
              } : { hours: '00', minutes: '00' },
              businessType: this.quotationData.placeInsureInfo ? this.quotationData.placeInsureInfo.displayInsureType : ''
            },
            part2: {
              ...this.quotationData.questionnaire.part2,
              buildingNature: this.quotationData.questionnaire.part2.buildingNature ? {
                Text: this.quotationData.questionnaire.part2.buildingNature,
                Value: this.quotationData.questionnaire.part2.buildingNature,
              } : { Text: '選擇性質', Value: '' },
              nearbyBuildingNature: this.quotationData.questionnaire.part2.nearbyBuildingNature ? {
                Text: this.quotationData.questionnaire.part2.nearbyBuildingNature,
                Value: this.quotationData.questionnaire.part2.nearbyBuildingNature,
              } : { Text: '選擇性質', Value: '' },
              securityCheck: this.quotationData.questionnaire.part2.securityCheck ? {
                Text: this.quotationData.questionnaire.part2.securityCheck,
                Value: this.quotationData.questionnaire.part2.securityCheck,
              } : { Text: '選擇性質', Value: '' },
              room: this.quotationData.questionnaire.part2.room && this.quotationData.questionnaire.part2.room.selected ? { selected: true, value: this.quotationData.questionnaire.part2.room.roomAmount } : { selected: false, value: '' },
              seat: this.quotationData.questionnaire.part2.seat && this.quotationData.questionnaire.part2.seat.selected ? { selected: true, value: this.quotationData.questionnaire.part2.seat.seatAmount } : { selected: false, value: '' },
            }
          }
        } else {
          data = {
            ...this.quotationData.questionnaire,
            sheet1: {
              ...this.quotationData.questionnaire.sheet1,
              part1: {
                ...this.quotationData.questionnaire.sheet1.part1,
                beginDateTime: this.quotationData.questionnaire.sheet1.part1.beginDateTime ? {
                  year: this.quotationData.questionnaire.sheet1.part1.beginDateTime.split('T')[0].split('-')[0] - 1911,
                  month: this.quotationData.questionnaire.sheet1.part1.beginDateTime.split('T')[0].split('-')[1],
                  day: this.quotationData.questionnaire.sheet1.part1.beginDateTime.split('T')[0].split('-')[2],
                  hours: this.quotationData.questionnaire.sheet1.part1.beginDateTime.split('T')[1].split(':')[0],
                } : { year: '', month: '', day: '', hours: '0' },
              }
            }
          }
        }

        this.$store.dispatch(`${type}/updatedQuestionnaire`, data)
      } else if (type == 'place') {
        this.$store.dispatch(`${type}/updatedQuestionnaire`, { ...quotation().questionnaire, part1: { ...quotation().questionnaire.part1 } })
      }
    },
    AssignQuestionnaireToManagement(data, type) {
      let copyData = JSON.parse(JSON.stringify(data))
      if (type === 'place') {
        copyData = {
          ...copyData,
          part1: {
            ...copyData.part1,
            createTime: copyData.part1.createTime ? {
              year: copyData.part1.createTime.split('T')[0].split('-')[0] - 1911,
              month: copyData.part1.createTime.split('T')[0].split('-')[1],
              day: copyData.part1.createTime.split('T')[0].split('-')[2],
            } : { year: '', month: '', day: '', },
            businessStartDate: copyData.part1.businessStartDate ? {
              hours: copyData.part1.businessStartDate.split('T')[1].split(':')[0],
              minutes: copyData.part1.businessStartDate.split('T')[1].split(':')[1],
            } : { hours: '00', minutes: '00' },
            businessEndDate: copyData.part1.businessEndDate ? {
              hours: copyData.part1.businessEndDate.split('T')[1].split(':')[0],
              minutes: copyData.part1.businessEndDate.split('T')[1].split(':')[1],
            } : { hours: '00', minutes: '00' },
          },
          part2: {
            ...copyData.part2,
            buildingNature: copyData.part2.buildingNature ? {
              Text: copyData.part2.buildingNature,
              Value: copyData.part2.buildingNature,
            } : { Text: '選擇性質', Value: '' },
            nearbyBuildingNature: copyData.part2.nearbyBuildingNature ? {
              Text: copyData.part2.nearbyBuildingNature,
              Value: copyData.part2.nearbyBuildingNature,
            } : { Text: '選擇性質', Value: '' },
            securityCheck: copyData.part2.securityCheck ? {
              Text: copyData.part2.securityCheck,
              Value: copyData.part2.securityCheck,
            } : { Text: '選擇性質', Value: '' },
            room: copyData.part2.room && copyData.part2.room.selected ? { selected: true, value: copyData.part2.room.roomAmount } : { selected: false, value: '' },
            seat: copyData.part2.seat && copyData.part2.seat.selected ? { selected: true, value: copyData.part2.seat.seatAmount } : { selected: false, value: '' },
          }
        }
      } else {
        console.log(copyData)
        copyData = {
          ...copyData,
          sheet1: {
            ...copyData.sheet1,
            part1: {
              ...copyData.sheet1.part1,
              beginDateTime: copyData.sheet1.part1.beginDateTime ? {
                year: copyData.sheet1.part1.beginDateTime.split('T')[0].split('-')[0] - 1911,
                month: copyData.sheet1.part1.beginDateTime.split('T')[0].split('-')[1],
                day: copyData.sheet1.part1.beginDateTime.split('T')[0].split('-')[2],
                hours: copyData.sheet1.part1.beginDateTime.split('T')[1].split(':')[0],
              } : { year: '', month: '', day: '', hours: '0' },
            },
            part3: {
              afterActivityHasAccessByTransportation: copyData.sheet1.part3.afterActivityHasAccessByTransportation ? '是' : '否',
              useRoadHasAccessByTransportation: copyData.sheet1.part3.useRoadHasAccessByTransportation ? '是' : '否',
            }
          }
        }
      }
      return copyData
    },
    placeQuestionnaireMapping(data) {
      data.questionnaire = data.questionnaire ? data.questionnaire : JSON.parse(JSON.stringify(this.questionnaire))
      data.questionnaire = {
        ...data.questionnaire,
        part2: {
          ...this.questionnaire.part2,
          buildingNature: this.questionnaire.part2.buildingNature.Value,
          nearbyBuildingNature: this.questionnaire.part2.nearbyBuildingNature.Value,
          securityCheck: this.questionnaire.part2.securityCheck.Value,
          room: { ...this.questionnaire.part2.room, roomAmount: this.questionnaire.part2.room.value },
          seat: { ...this.questionnaire.part2.seat, seatAmount: this.questionnaire.part2.seat.value },
        }
      }
      if (this.questionnaire.part1.createTime && Object.keys(this.questionnaire.part1.createTime).every(key => this.questionnaire.part1.createTime[key] !== '')) {
        data.questionnaire.part1.createTime = `${Number(this.questionnaire.part1.createTime.year) + 1911}-${this.questionnaire.part1.createTime.month}-${this.questionnaire.part1.createTime.day}`
      } else data.questionnaire.part1.createTime = null

      if (this.questionnaire.part1.businessStartDate && Object.keys(this.questionnaire.part1.businessStartDate).every(key => this.questionnaire.part1.businessStartDate[key])) {
        data.questionnaire.part1.businessStartDate = `${this.questionnaire.part1.businessStartDate.hours}:${this.questionnaire.part1.businessStartDate.minutes}`
      } else data.questionnaire.part1.businessStartDate = null

      if (this.questionnaire.part1.businessEndDate && Object.keys(this.questionnaire.part1.businessEndDate).every(key => this.questionnaire.part1.businessEndDate[key])) {
        data.questionnaire.part1.businessEndDate = `${this.questionnaire.part1.businessEndDate.hours}:${this.questionnaire.part1.businessEndDate.minutes}`
      } else data.questionnaire.part1.businessEndDate = null
      return data
    },
    activityQuestionnaireMapping(data) {
      data.questionnaire = data.questionnaire ? data.questionnaire : JSON.parse(JSON.stringify(this.questionnaire))
      if (data.questionnaire.sheet1.part1.beginDateTime && Object.keys(data.questionnaire.sheet1.part1.beginDateTime).every(key => data.questionnaire.sheet1.part1.beginDateTime[key] !== '')) {
        data.questionnaire.sheet1.part1.beginDateTime = `${Number(data.questionnaire.sheet1.part1.beginDateTime.year) + 1911}-${data.questionnaire.sheet1.part1.beginDateTime.month}-${data.questionnaire.sheet1.part1.beginDateTime.day} ${data.questionnaire.sheet1.part1.beginDateTime.hours}:00`
      } else {
        data.questionnaire.sheet1.part1.beginDateTime = null
      }
      if (data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation == '是') {
        data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation = true
      } else if (data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation == '否') {
        data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation = false
      } else if (data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation !== true && data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation !== false) {
        data.questionnaire.sheet1.part3.afterActivityHasAccessByTransportation = null
      }
      if (data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation == '是') {
        data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation = true
      } else if (data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation == '否') {
        data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation = false
      } else if (data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation !== true && data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation !== false) {
        data.questionnaire.sheet1.part3.useRoadHasAccessByTransportation = null
      }
      return data
    },
  }
}