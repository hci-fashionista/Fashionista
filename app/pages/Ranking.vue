<template>
    <div class="container">
		<TagInput />

        <div class="search">
            <h1>Preset</h1>
            <div class="searchbox"></div>
            <div class="selected">
                <li v-for="tag_name in selected_tag_names" :key="tag_name">
                    <AppTag :name="tag_name"></AppTag>
                </li>
            </div>
            <div class="tags">
                <h3>Best</h3>
                <ul class="tags_list">
                    <li v-for="(tag, index) in tag_names" :key="tag">
                        <div @click="tag_clicked(tag, index)">
                            <AppTag :name="tag" :selected="bool[index]"></AppTag>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rankings">
            <h1>Ranking</h1>
            <ul class="clothes_list">
                <li v-for="clothId in clothIds" :key="clothId">
				    <AppClothwithRank :clothId="clothId"></AppClothwithRank>
			    </li>
            </ul>

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

    export default {
        data() {
            return {
                clothIds: [1,2,3,4,5,6,7,8,9],
                total_tags: [ "skinny_leg",  "small_face", "long_leg", "large_face"],
                tag_names: [ "skinny_leg",  "small_face", "long_leg", "large_face"],
                bool: [false, false, false, false],
                selected_tag_names: [],
            }
        },
        methods: {
            tag_clicked(name, index){
                if (this.bool[index] ){
                    this.bool[index] = false
                    this.selected_tag_names.pop(name)
                }
                else{
                    this.bool[index] = true
                    this.selected_tag_names.push(name)
                }
            },
            test(){
                console.log("11")
            }
        },
        components: {
            AppClothwithRank,
            AppTag,
			TagInput
        }
    }
</script>
