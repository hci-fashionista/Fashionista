<template>
    <div class="clothwithrank">
        <div class="info">
            <div class="rank">{{detail.rank}}</div>
            <div class="new" v-if="detail.is_new">new</div>
        </div>
        <AppCloth :name="detail.name" :price="detail.price" :likes="detail.likes"></AppCloth>
    </div>
</template>

<style scoped>
    div.clothwithrank{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.info{
        height: 100%;
        align-self: start;
    }

    div.new{
        width: 56px;
        height: 56px;
        border-radius: 30px;
        background-color: #F48484;
        text-align: center;
        color: white;
        line-height: 56px;
        font-family: 'Raleway';
        font-size: 20px;
        font-weight: 800;
    }

    div.rank{
        width: 56px;
        height: 56px;
        margin-bottom: 5px;
        background-color: var(--blue-400);
        text-align: center;
        color: white;
        line-height: 56px;
        font-family: 'Roboto';
        font-size: 41px;
        font-weight: 800;
    }
</style>

<script>
    import AppCloth from "@/components/AppCloth";
    export default {
        props: {
            detail: {
                type: Object
            }
        },
        components: {
			AppCloth
		}
    }
</script>
