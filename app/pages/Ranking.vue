<template>
    <div class="container">
		
        <div class="search">
            <h1>Preset</h1>
            <div class="body">
                <select id="height" name="height" @change="heightChanged($event)">
                    <option value="-150">-150cm</option>
                    <option value="150-160" selected>150cm-160cm</option>
                    <option value="160-170">160cm-170cm</option>
                    <option value="170-180">170cm-180cm</option>
                    <option value="180-190">180cm-190cm</option>
                    <option value="190-">190cm-</option>
                </select>
                <select id="weight" name="weight" @change="weightChanged($event)">
                    <option value="-50">-50kg</option>
                    <option value="50-60" selected>50kg-60kg</option>
                    <option value="60-70">60kg-70kg</option>
                    <option value="70-80">70kg-80kg</option>
                    <option value="80-90">80kg-90kg</option>
                    <option value="90-">90kg-</option>
                </select>
            </div>
            <div class="tag_area">
                <TagInput @tagChanged="tagChanged"/>
            </div>
            
        </div>
        <div class="rankings">
            <h1>Ranking</h1>
            <ul class="coordinations_list">
                <li @click="showpopup(coordination)" v-for="(coordination, index) in selected_coordinations" :key="index">
                    <CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index">
                    </CoordinationwithRank>
                </li>
            </ul>
        </div>

        <RankingCoordinationDetail ref="coordinationChooser" :Coordinations="selected_info" v-if="selected_info">
        </RankingCoordinationDetail>

    </div>
</template>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
    }
    .search{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .search > h1 {
        margin-left: 20px;
        align-self: start;
    }
    .body {
        align-self: flex-start;
        margin: 30px 30px;
        display: flex;
        width: 22%;
    }
    .body > select{
        width: 40%;
        min-height: 40px;
        padding: 10px;
        font-size: medium;
        margin-right: 20px;
        border-radius: 10px;
    }
    .tag_area {
        width: 60%;
        align-self: flex-start;
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
    import RankingCoordinationDetail from "@/components/RankingCoordinationDetail"

    const db = firebase.firestore()
    
    
    export default {
        data() {
            return {
                clothIds: [1,2,3,4,5,6,7,8,9],
                selected_tag_names: [],
                total_coordinations: [],
                selected_coordinations: [],
                height: "150-160",
                weight: "50-60",
                clothes_dict: {},
                selected_info: null
            }
        },
        methods: {
            showpopup(coordi){
                console.log(coordi)
                this.selected_info = coordi
                if(this.$refs.coordinationChooser)
					this.$refs.coordinationChooser.open();
            },
            tagChanged(received){
                this.selected_tag_names = received
                this.selected_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
            },
            heightChanged(event){
                this.height = event.target.value
                this.selected_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
                
            },
            weightChanged(event){
                this.weight = event.target.value
                this.selected_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
                
            },
            filtering(coordination){
                let coordination_height = coordination.bodyShape.height
                let coordination_weight = coordination.bodyShape.weight
                let selected_tags = this.selected_tag_names
                if(coordination_height == this.height && coordination_weight == this.weight){
                    if(selected_tags.length < 1){
                        return true
                    }
                    else if (coordination.tags.filter(tag => selected_tags.includes(tag)).length >= selected_tags.length){
                        return true
                    }
                    else
                        return false
                }
                else{
                    return false
                }
            }
        },
        mounted() {
            db.collection("ranking").get().then(async (querySnapshot)=>{
                await querySnapshot.forEach((doc)=>{
                    // doc.data() is never undefined for query doc snapshots
                    let dataObject = doc.data()
                    dataObject["id"] = doc.id
                    if(dataObject["published"]){
                        this.total_coordinations.push(dataObject)
                    }            
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
                            console.log("No such document!");
                        }
                    })
                    await docRef_pants.get().then((data)=>{
                        if (data.exists) {
                            this.clothes_dict[coordination.id].push(data.data())
                        } else {
                            console.log("No such document!");
                        }
                    })
                }))
            })
            .then(()=>{
                this.total_coordinations = this.total_coordinations.sort(function(coord1, coord2){
                    return coord2.likes - coord1.likes
                })
                console.log(this.total_coordinations)
                this.selected_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
                // this.selected_coordinations = JSON.parse(JSON.stringify(this.total_coordinations))
                console.log("finished")
            })
        },
        components: {
            AppClothwithRank,
            AppTag,
            TagInput,
            CoordinationwithRank,
            RankingCoordinationDetail
        }
    }
</script>
