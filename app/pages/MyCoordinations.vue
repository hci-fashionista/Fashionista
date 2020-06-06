<template>
    <div class="container">
        <div class="myCoordinations">
            <h1>MyCoordinations</h1>
            <ul class="coordinations_list">
                <li class="clickable" @click="uploadRankingPopupOpen(coordination)" v-for="(coordination, index) in my_coordinations" :key="index">
					<CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index">
					</CoordinationwithRank>
                </li>
            </ul>
        </div>
		<UploadRanking ref="uploadRankingPopup" :Coordinations="selected_info" v-if="selected_info"/>
    </div>
</template>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
    }

	.clickable {
		cursor: pointer;
	}

    .rankings{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .rankings > h1 {
        margin-left: 20px;
        align-self: start;
    }
    .coordinations_list {
        list-style: none;
        padding: 0px 0px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
	}
    .coordinations_list > li {
        margin: 20px 20px;
    }
</style>

<script>
    import AppClothwithRank from "@/components/AppClothwithRank"
    import AppTag from "@/components/AppTag"
	import TagInput from "@/components/TagInput"
    import firebase from "../src/firebase.js"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import UploadRanking from "@/components/UploadRanking"

    const db = firebase.firestore()
    
    
    export default {
        data() {
            return {
                clothIds: [1,2,3,4,5,6,7,8,9],
                total_coordinations: [],
                my_coordinations: [],
                height: "150~160",
                weight: "50~60",
				clothes_dict: {},
				selected_info: null
            }
        },
        methods: {
            uploadRankingPopupOpen(coordi) {
				this.selected_info = coordi;
                if(this.$refs.uploadRankingPopup)
					this.$refs.uploadRankingPopup.open();
			},

			filtering(coordination){
				if (coordination.author == "Dol Lee") {
					return true;
				}
				else {
					return false;
				}
            },
        },
        mounted() {
            db.collection("ranking").get().then(async (querySnapshot)=>{
                await querySnapshot.forEach((doc)=>{
                    // doc.data() is never undefined for query doc snapshots
                    let dataObject = doc.data()
                    dataObject["id"] = doc.id
                    this.total_coordinations.push(dataObject)
                });
            })
            .then(async ()=>{
                await Promise.all(this.total_coordinations.map(async (coordination)=>{
                    let clothes = coordination.clothes
                    let docRef_top = db.collection("top").doc(clothes.top)
                    let docRef_pants = db.collection("pants").doc(clothes.pants)
                    this.clothes_dict[coordination.id] = []
                    await docRef_top.get().then((data)=>{
                        if (data.exists) {
                            this.clothes_dict[coordination.id].push(data.data())
                        } else {
                        }
                    })
                    await docRef_pants.get().then((data)=>{
                        if (data.exists) {
                            this.clothes_dict[coordination.id].push(data.data())
                        } else {
                        }
                    })
                }))
            })
            .then(()=>{
                this.my_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
                // this.selected_coordinations = JSON.parse(JSON.stringify(this.total_coordinations))
            })
        },
        components: {
            AppClothwithRank,
            AppTag,
            TagInput,
			CoordinationwithRank,
			UploadRanking
        }
    }
</script>
