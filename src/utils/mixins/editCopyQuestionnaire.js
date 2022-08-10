import { mapState } from 'vuex'

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
              room: this.quotationData.questionnaire.part2.room ? this.quotationData.questionnaire.part2.room : { selected: false, value: '' },
              seat: this.quotationData.questionnaire.part2.seat ? this.quotationData.questionnaire.part2.seat : { selected: false, value: '' },
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
      }
    }
  }
}