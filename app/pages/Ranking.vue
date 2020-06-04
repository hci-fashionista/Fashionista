<template>
    <div class="container">
		
        <div class="search">
            <h1>Preset</h1>
            <div class="body">
                <select name="height" @change="heightChanged($event)">
                    <option value="~150">~150cm</option>
                    <option value="150~160">150cm~160cm</option>
                    <option value="160~170">160cm~170cm</option>
                    <option value="170~180" selected>170cm~180cm</option>
                    <option value="180~190">180cm~190cm</option>
                    <option value="190~">190cm~</option>
                </select>
                <select name="weight" @change="weightChanged($event)">
                    <option value="~50">~50kg</option>
                    <option value="50~60" selected>50kg~60kg</option>
                    <option value="60~70">60kg~70kg</option>
                    <option value="70~80">70kg~80kg</option>
                    <option value="80~90">80kg~90kg</option>
                    <option value="90~">90kg~</option>
                </select>
            </div>
            <div class="tag_area">
                <TagInput @tagChanged="tagChanged"/>
            </div>
            
        </div>
        <div class="rankings">
            <h1>Ranking</h1>
            <ul class="coordinations_list">
                <li v-for="coordination in selected_coordinations" :key="coordination.name">
                    {{coordination.name}}
                    {{coordination.description}}
                    {{coordination.totalPrice}}
                </li>
            </ul>
            <!-- <ul class="clothes_list">
                <li v-for="clothId in clothIds" :key="clothId">
				    <AppClothwithRank :clothId="clothId"></AppClothwithRank>
			    </li>
            </ul> -->

        </div>

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
    .clothes_list {
        list-style: none;
        padding: 0px 0px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
	}
    .clothes_list > li {
        margin: 20px 20px;
    }
</style>

<script>
    import AppClothwithRank from "@/components/AppClothwithRank"
    import AppTag from "@/components/AppTag"
	import TagInput from "@/components/TagInput"
    import firebase from "../src/firebase.js"


    const db = firebase.firestore()
    
    
    export default {
        data() {
            return {
                clothIds: [1,2,3,4,5,6,7,8,9],
                total_tags: [ "skinny_leg",  "small_face", "long_leg", "large_face"],
                tag_names: [ "skinny_leg",  "small_face", "long_leg", "large_face"],
                bool: [false, false, false, false],
                selected_tag_names: [],
                height: "170cm~180cm",
                weight: "50kg~60kg",
                total_coordinations: [],
                selected_coordinations: []
            }
        },
        methods: {
            tagChanged(received){
                if(received.length < 1){
                    this.selected_coordinations = JSON.parse(JSON.stringify(this.total_coordinations))
                }
                else{
                    let temp = []
                    this.total_coordinations.forEach(coordination => {
                        console.log(coordination.tags.filter(tag => received.includes(tag)))
                        if (coordination.tags.filter(tag => received.includes(tag)).length >= received.length){
                            temp.push(coordination)
                        }
                    })
                    this.selected_coordinations = temp
                }
                
            },
            heightChanged(event){
                console.log(event.target.value)
            },
            weightChanged(event){
                console.log(event.target.value)
            },
        },
        mounted() {
            db.collection("ranking").get().then(async (querySnapshot)=>{
                await querySnapshot.forEach((doc)=>{
                    // doc.data() is never undefined for query doc snapshots
                    doc.data()["id"] = doc.id
                    console.log(doc.id, " => ", doc.data());
                    this.total_coordinations.push(doc.data())
                });
            })
            .then(()=>{
                this.selected_coordinations = JSON.parse(JSON.stringify(this.total_coordinations))
                console.log("finished")
            })
        },
        components: {
            AppClothwithRank,
            AppTag,
			TagInput
        }
    }
</script>
