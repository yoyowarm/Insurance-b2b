import { mapState } from 'vuex'
import { quotationStep1, quotation } from '@/utils/dataTemp'
import { formatDate } from '@/utils/dateFormat'
export default {
	computed: {
		...mapState({
			'InsuranceActive': state => state.quotationStep1.InsuranceActive,
			'step1Model': state => state.quotationStep1.step1Model,
		})
	},
	watch: {
		'targetSelect.roofList': function (val) {
			if (this.InsuranceActive === 0) return
			if (val.length > 0 && this.step1Model.step1ViewModel.Roof) {
				const roof = this.targetSelect.roofList.find(item => item.Value == this.step1Model.step1ViewModel.Roof)
				if (roof) {
					roof.placeholder = roof.Text
					roof.id = roof.Value
					this.targetData = Object.assign({ ...this.targetData }, { roof })
				}
			}
		},
		'targetSelect.structureList': function (val) {
			if (this.InsuranceActive === 0) return
			if (val.length > 0 && this.step1Model.step1ViewModel.Structure) {
				const structure = this.targetSelect.structureList.find(item => item.Value == this.step1Model.step1ViewModel.Structure)
				if (structure) {
					structure.placeholder = structure.Text
					structure.id = structure.Value
					this.targetData = Object.assign({ ...this.targetData }, { structure })
				}
			}
		},
		'targetSelect.areaList': function (val) {
			if (this.InsuranceActive === 0) return
			if (val.length > 0 && this.step1Model.step1ViewModel.Area) {
				const Area = this.targetSelect.areaList.find(item => item.Value == this.step1Model.step1ViewModel.Area)
				if (Area) {
					Area.placeholder = Area.Text
					Area.id = Area.Value
					this.targetData = Object.assign({ ...this.targetData }, { Area })
				}
			}
		}
	},
	methods: {
		quotationDataArrangement(data) {
			console.log(data)
			if (this.InsuranceActive === 0) return
			const obj = {
				step1ViewModel: data.step1ViewModel,
				step2ViewModel: data.step2ViewModel,
				InsuredCode: data.InsuredCode,
				TypeNumber: data.TypeNumber,
				InsuranceActive: this.InsuranceActive,
				UserID: data.UserID,
				OrderNo: data.OrderNo,
				SerialNo: data.SerialNo,
				CreateDate: formatDate(new Date())
			}
			this.$store.dispatch('quotationStep1/updatedStep1Model', obj)

			const copyInfo = quotationStep1().info
			Object.assign(copyInfo, {
				IsRenewal: data.step1ViewModel.IsRenewal,
				InsuranceNumber: data.step1ViewModel.InsuranceNumber,
				startDate: {
					year: data.step1ViewModel.StartDate.split('-')[0],
					month: data.step1ViewModel.StartDate.split('-')[1],
					day: data.step1ViewModel.StartDate.split('-')[2]
				},
				endDate: {
					year: data.step1ViewModel.EndDate.split('-')[0],
					month: data.step1ViewModel.EndDate.split('-')[1],
					day: data.step1ViewModel.EndDate.split('-')[2]
				},
				IsMortgageNeeded: data.step1ViewModel.HasMortgage,
				IOfficer: data.step1ViewModel.IOfficer,
				LoginCode: data.step1ViewModel.LoginCode,
			})
			this.$store.dispatch('quotationStep1/updatedInfo', copyInfo)

			const copyTarget = quotationStep1().target
			Object.assign(copyTarget, {
				address: data.step1ViewModel.Address,
				Square: (data.step1ViewModel.Square).toString(),
				TotalFloor: (data.step1ViewModel.TotalFloor).toString(),
				HasFactoryOrStoreInBuilding: data.step1ViewModel.HasFactoryOrStoreInBuilding,
				SpectificFloor: (data.step1ViewModel.SpectificFloor).toString(),
			})
			this.$store.dispatch('quotationStep1/updatedTarget', copyTarget)

		},
		step1InitAssignValue() {
			if (this.step1Model.step1ViewModel.ProgramID) {
				const program = this.programList.find(item => item.ProgramID == this.step1Model.step1ViewModel.ProgramID)
				if (program) {
					program.Value = (program.ProgramID).toString()
					program.Text = program.ProgramName
					this.changeProgram(program)
				}
			}

			if (this.step1Model.step1ViewModel.Bank) {
				const bank = this.infoSelect.bankList.find(item => item.Value == this.step1Model.step1ViewModel.Bank)
				bank.placeholder = bank.Text
				bank.id = bank.Value
				this.infoData = Object.assign({ ...this.infoData }, { bank })

			}
			if (this.step1Model.step1ViewModel.IBroker) {
				const brokers = this.infoSelect.brokers.find(item => item.Value == this.step1Model.step1ViewModel.IBroker)
				if (brokers) {
					brokers.placeholder = brokers.Text
					brokers.id = brokers.Value
					this.infoData = Object.assign({ ...this.infoData }, { IBroker: brokers })
				}

			}

			if (this.step1Model.step1ViewModel.IChannel) {
				const IChannel = this.infoSelect.channels.find(item => item.Value == this.step1Model.step1ViewModel.IChannel)
				if (IChannel) {
					IChannel.placeholder = IChannel.Text
					IChannel.id = IChannel.Value
					this.infoData = Object.assign({ ...this.infoData }, { IChannel })
				}

			}

			if (this.step1Model.step1ViewModel.City) {
				const City = this.targetSelect.cityList.find(item => item.Value == this.step1Model.step1ViewModel.City)
				City.placeholder = City.Text
				City.id = City.Value
				this.targetData = Object.assign({ ...this.targetData }, { City })

			}
		},
		step2InitAssignValue() {
			const step2Data = this.step1Model.step2ViewModel
			const Insuraned = quotation().Insuraned
			const Applicant = quotation().Applicant
			const Paper = quotation().Paper

			let InsuranedNationality = {}
			let InsuranedCity = {}
			let InsuranedRegisterNationality = {}
			let ApplicantNationality = {}
			let ApplicantCity = {}
			let ApplicantRegisterNationality = {}
			if (step2Data.Insuraned.Nationality) {
				InsuranedNationality = this.nationalities.find(item => item.Value === step2Data.Insuraned.Nationality)
				InsuranedNationality.placeholder = InsuranedNationality.Text
				InsuranedNationality.id = InsuranedNationality.Value
			}

			if (step2Data.Insuraned.RegisterNationality) {
				InsuranedRegisterNationality = this.nationalities.find(item => item.Value === step2Data.Insuraned.RegisterNationality)
				InsuranedRegisterNationality.placeholder = InsuranedRegisterNationality.Text
				InsuranedRegisterNationality.id = InsuranedRegisterNationality.Value
			}

			if (step2Data.Insuraned.City) {
				InsuranedCity = this.cityList.find(item => item.Value === step2Data.Insuraned.City)
				InsuranedCity.placeholder = InsuranedCity.Text
				InsuranedCity.id = InsuranedCity.Value
			}

			if (step2Data.Applicant.Nationality) {
				ApplicantNationality = this.nationalities.find(item => item.Value === step2Data.Applicant.Nationality)
				ApplicantNationality.placeholder = ApplicantNationality.Text
				ApplicantNationality.id = ApplicantNationality.Value
			}

			if (step2Data.Applicant.RegisterNationality) {
				ApplicantRegisterNationality = this.nationalities.find(item => item.Value === step2Data.Applicant.RegisterNationality)
				ApplicantRegisterNationality.placeholder = ApplicantRegisterNationality.Text
				ApplicantRegisterNationality.id = ApplicantRegisterNationality.Value
			}

			if (step2Data.Applicant.City) {
				ApplicantCity = this.cityList.find(item => item.Value === step2Data.Applicant.City)
				ApplicantCity.placeholder = ApplicantCity.Text
				ApplicantCity.id = ApplicantCity.Value
			}

			Object.assign(Insuraned, {
				ID: step2Data.Insuraned.ID,
				Name: step2Data.Insuraned.Name,
				IsForeigner: step2Data.Insuraned.IsForeigner,
				Nationality: InsuranedNationality,
				Corporate: step2Data.Insuraned.Corporate,
				CorporateRequired: step2Data.Insuraned.Corporate ? true : false,
				City: InsuranedCity,
				Street: step2Data.Insuraned.Street,
				Mobile: step2Data.Insuraned.Mobile,
				IsForeignRegister: Boolean(step2Data.Insuraned.IsForeignRegister),
				RegisterNationality: InsuranedRegisterNationality,
				Profession: step2Data.Insuraned.Profession,
				IsPolitician: step2Data.Insuraned.IsPolitician,
				overseasOrDomestic: step2Data.Insuraned.overseasOrDomestic,
				IsProOrNot: step2Data.Insuraned.IsProOrNot,
			})

			Object.assign(Applicant, {
				ID: step2Data.Applicant.ID,
				Name: step2Data.Applicant.Name,
				IsForeigner: step2Data.Applicant.IsForeigner,
				Nationality: ApplicantNationality,
				Corporate: step2Data.Applicant.Corporate,
				CorporateRequired: step2Data.Applicant.Corporate ? true : false,
				City: ApplicantCity,
				Street: step2Data.Applicant.Street,
				Mobile: step2Data.Applicant.Mobile,
				IsForeignRegister: Boolean(step2Data.Applicant.IsForeignRegister),
				RegisterNationality: ApplicantRegisterNationality,
				Profession: step2Data.Applicant.Profession,
				IsPolitician: step2Data.Applicant.IsPolitician,
				overseasOrDomestic: step2Data.Applicant.overseasOrDomestic,
				IsProOrNot: step2Data.Applicant.IsProOrNot,
			})
			if (step2Data.Relation) {
				const Relation = this.relationShips.find(item => item.Value === step2Data.Relation)
				Relation.placeholder = Relation.Text
				Relation.id = Relation.Value
				this.$store.dispatch('quotationStep2/updatedRelation', Relation)
			}
			if (step2Data.Paper.InsuredReciepts.length > 0) {
				Paper.IsRecieptChoseOther = true
			}
			Object.assign(Paper, step2Data.Paper)
			this.InsuranedData = Insuraned
			this.ApplicantData = Applicant
			this.PaperData = Paper

		},
		step2InitAssignArea() {
			const step2Data = this.step1Model.step2ViewModel
			let ApplicantArea = {}
			let InsuranedArea = {}
			if ((step2Data.Insuraned.Area).toString()) {
				InsuranedArea = this.InsuranedAreaList.find(item => item.Value == step2Data.Insuraned.Area)
				if (InsuranedArea) {
					InsuranedArea.placeholder = InsuranedArea.Text
					InsuranedArea.id = InsuranedArea.Value
					this.InsuranedData = Object.assign({ ...this.InsuranedData }, { Area: InsuranedArea })
				}
			}

			if ((step2Data.Applicant.Area).toString()) {
				ApplicantArea = this.ApplicantAreaList.find(item => item.Value == step2Data.Applicant.Area)
				if (ApplicantArea) {
					ApplicantArea.placeholder = ApplicantArea.Text
					ApplicantArea.id = ApplicantArea.Value
					this.ApplicantData = Object.assign({ ...this.ApplicantData }, { Area: ApplicantArea })
				}
			}
		},
		step1HasProgramIDAssignValue() {
			if (this.step1Model.step1ViewModel.UsageByTyping) {
				this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { UsageDetail: this.step1Model.step1ViewModel.UsageByTyping })
			}
			if (this.step1Model.step1ViewModel.PolicyBase) {
				const obj = { placeholder: '選擇標的物價值約定基礎', id: '', }
				if (this.step1Model.step1ViewModel.PolicyBase === '1') {
					obj.placeholder = '實際現金價值基礎'
					obj.id = '1'
				} else if (this.step1Model.step1ViewModel.PolicyBase === '2') {
					obj.placeholder = '重置成本基礎'
					obj.id = '2'
				}
				this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { PolicyBase: obj })
			}
			if (this.step1Model.step1ViewModel.PolicyOnwer) {
				this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { PolicyOnwer: this.step1Model.step1ViewModel.PolicyOnwer })
			}
			if (this.step1Model.step1ViewModel.Branch) {
				const branch = this.infoSelect.branchList.find(item => item.Value == this.step1Model.step1ViewModel.Branch)
				if (branch) {
					branch.placeholder = branch.Text
					branch.id = branch.Value
					this.infoData = Object.assign({ ...this.infoData }, { branch })
				}
			}

			if (this.step1Model.step1ViewModel.UsageID && this.step1Model.step1ViewModel.UsageName) {
				const Usage = {
					id: this.step1Model.step1ViewModel.UsageID,
					placeholder: this.step1Model.step1ViewModel.UsageID + ' ' + this.step1Model.step1ViewModel.UsageName
				}
				this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { Usage })
			}

			if (this.step1Model.step1ViewModel.LossProgram) {
				const LossProgram = this.SchemeSettingSelect.LossProgram.LossProgramMenu.find(item => item.ID == this.step1Model.step1ViewModel.LossProgram)
				if (LossProgram) {
					LossProgram.placeholder = LossProgram.Name + ' ' + LossProgram.Amount
					LossProgram.id = (LossProgram.ID).toString()
					this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { LossProgram })
				}
			}

			if (this.step1Model.step1ViewModel.Commision) {
				const Commision = this.CommissionSelect.selectLists.find(item => item.Value == this.step1Model.step1ViewModel.Commision)
				if (Commision) {
					this.$store.dispatch('quotationStep1/updatedSelectedCommission', Commision)
				}
			}

			if (this.step1Model.step1ViewModel.Additionals.length > 0) {
				this.step1Model.step1ViewModel.Additionals.map(item => {
					const Additional = this.AdditionInsuranceSelect.selectLists.find(item2 => item2.AdditionID == item.AdditionID)
					if (Additional) {
						const additionalAmounts = Additional.Amounts.find(amount => amount.Value == item.AmountID)
						if (additionalAmounts) {
							const obj = {
								id: additionalAmounts.Value,
								placeholder: additionalAmounts.Text,
								selected: true,
								amount: additionalAmounts.Text
							}
							this.AdditionInsuranceData = Object.assign({ ...this.AdditionInsuranceData }, { [Additional.AdditionName]: obj })
						}
					}
				})
			}

			if (this.step1Model.step1ViewModel.AdditionTerms.length > 0) {
				this.step1Model.step1ViewModel.AdditionTerms.map(item => {
					const AdditionalTerm = this.AdditionInsuranceSelect.selectLists.find(item2 => item2.AdditionID == item)
					if (AdditionalTerm) {
						this.AdditionalTerms = Object.assign({ ...this.AdditionalTerms }, { [AdditionalTerm.TermName]: { selected: true } })
					}
				})
			}

			if (this.step1Model.step1ViewModel.Subjects.length > 0) {
				Object.keys(this.SchemeSetting).map(key => {
					if (key.includes('target') && this.SchemeSetting[key].id !== '') {
						const target = this.step1Model.step1ViewModel.Subjects.find(item => item.SubID == this.SchemeSetting[key].SubID)
						if (target) {
							const obj = {
								placeholder: `${target.Amount}`,
								id: `${target.AmountID}`
							}
							this.SchemeSettingData = Object.assign({ ...this.SchemeSettingData }, { [key]: obj })
						}
					}
				})
			}
		},
		LiabilityInsuranceAssignEditCopyData() {
			if (this.step1Model.step1ViewModel.Liabilities.length > 0) {
				this.step1Model.step1ViewModel.Liabilities.map(item => {
					const Liability = this.liabilityLists.find(item2 => item2.LiabilityID == item.LiabilityID)
					if (Liability) {
						const program = Liability.LiabilitySubPrograms.find(program => program.ID == item.SubProgram)
						if (program) {
							program.Text = program.Name
							program.Value = program.ID
							this.emitSelectItem(Liability.LiblityName, program, Liability.LiabilitySubPrograms)
							if (!Liability.IsRequired) {
								this.updateSwitch(Liability.LiblityName, true)
							}
							if (Liability.HasInsuredNumber && item.InsuredNumber) {
								this.updateInsuredNumber(Liability.LiblityName, Number(item.InsuredNumber))
							}

						}
					}
				})
			}
		},
		targetAssignEditCopyData(subID, index) {
			if (this.step1Model.step1ViewModel.Subjects.length > 0) {
				const Subject = this.step1Model.step1ViewModel.Subjects.find(item => item.SubID == subID)
				if (Subject) {
					Subject.Text = Subject.Amount
					Subject.Value = Subject.AmountID
					if (!this.copySchemeSetting[`target${index + 1}`].id) {
						this.emitSelectItem(`target${index + 1}`, Subject, index)
					}
				}
			}
		},

	}
}