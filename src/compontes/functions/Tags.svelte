<main class="tags-box">

    <div class="tags"  on:mouseover={()=>{show_description = true}}  on:mouseout={()=>{show_description = false}}>
        {#if show_description}
            <div class="tags-description">{tag_description}</div>
        {/if}
        {tag_name}
    </div>
</main>

<script>
    export  let tag_name = "";
    export  let tag_description = "";
    let show_description = false;

</script>

<style>

    .tags{
        float: left;
        width: fit-content;
        padding: 10px;
        color: white;
        font-weight: normal;
        border:#425542 2px solid;
        box-sizing: border-box;
        margin: 10px;
        background: #1A262F;
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    .tags-description{
        position: absolute;
        z-index: 9999;
        top: -80px;
        left: -10px;
        width: 300px;
        background: gold;
        padding: 10px;
        color: black;

    }
</style>