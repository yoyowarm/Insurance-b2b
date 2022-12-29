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
              businessType: this.quotationData.placeInsureInfo.displayInsureType
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
                  minutes: this.quotationData.questionnaire.sheet1.part1.beginDateTime.split('T')[1].split(':')[1],
                } : { year: '', month: '', day: '', hours: '0', minutes: '0', },
              }
            }
          }
        }

        this.$store.dispatch(`${type}/updatedQuestionnaire`, data)
      } else if (type == 'place') {
        this.$store.dispatch(`${type}/updatedQuestionnaire`, { ...quotation().questionnaire, part1: { ...quotation().questionnaire.part1, businessType: this.quotationData.placeInsureInfo.displayInsureType } })
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
                minutes: copyData.sheet1.part1.beginDateTime.split('T')[1].split(':')[1],
              } : { year: '', month: '', day: '', hours: '0', minutes: '0', },
            },
            part3: {
              afterActivityHasAccessByTransportation: copyData.sheet1.part3.afterActivityHasAccessByTransportation ? '是' : '否',
              useRoadHasAccessByTransportation: copyData.sheet1.part3.useRoadHasAccessByTransportation ? '是' : '否',
            }
          }
        }
      }
      return copyData
    }
  }
}