<template>
<div id="chapter">
<p>
  <button class="btn btn-white btn-default btn-round" @click="getChapterList(1)">
    <i class="ace-icon fa fa-refresh red2"></i>
    刷新
  </button>
</p>
<pagination ref="pagination" :list="getChapterList"></pagination>

  <table id="simple-table" class="table  table-bordered table-hover">
    <thead>
    <tr>
      <th>ID</th>
      <th>名称</th>
      <th>课程ID</th>
      <th>操作</th>

    </tr>
    </thead>

    <tbody>

    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.courseId}}</td>
      <td>
        <div class="hidden-sm hidden-xs btn-group">
          <button class="btn btn-xs btn-success">
            <i class="ace-icon fa fa-check bigger-120"></i>
          </button>

          <button class="btn btn-xs btn-info">
            <i class="ace-icon fa fa-pencil bigger-120"></i>
          </button>

          <button class="btn btn-xs btn-danger">
            <i class="ace-icon fa fa-trash-o bigger-120"></i>
          </button>

          <button class="btn btn-xs btn-warning">
            <i class="ace-icon fa fa-flag bigger-120"></i>
          </button>
        </div>

        <div class="hidden-md hidden-lg">
          <div class="inline pos-rel">
            <button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown" data-position="auto">
              <i class="ace-icon fa fa-cog icon-only bigger-110"></i>
            </button>

            <ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
              <li>
                <a href="#" class="tooltip-info" data-rel="tooltip" title="View">
																			<span class="blue">
																				<i class="ace-icon fa fa-search-plus bigger-120"></i>
																			</span>
                </a>
              </li>

              <li>
                <a href="#" class="tooltip-success" data-rel="tooltip" title="Edit">
																			<span class="green">
																				<i class="ace-icon fa fa-pencil-square-o bigger-120"></i>
																			</span>
                </a>
              </li>

              <li>
                <a href="#" class="tooltip-error" data-rel="tooltip" title="Delete">
																			<span class="red">
																				<i class="ace-icon fa fa-trash-o bigger-120"></i>
																			</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </td>

    </tr>

    </tbody>
  </table>
</div>
</template>

<script>
import Pagination from "@/components/pagination";

export default {
  name: "Chapter",
  data() {
    return {
      chapters: []
    }
  },
  components: {
    Pagination
  },
  mounted() {
    // this.$parent.activeSidebar("business-chapter-sidebar")
    let _this = this
    _this.$refs.pagination.size=5;
    console.log("chapter")
    _this.getChapterList(1)
  },
  methods: {
    getChapterList(page) {
      let _this = this
      _this.axios.post("http://localhost:9000/business/admin/chapter/list",{
        current: page,
        size: _this.$refs.pagination.size
      }).then((response)=> {
        console.log(response.data)
        _this.chapters = response.data.records
        _this.$refs.pagination.render(page,response.data.total)
      })
    }
  }
}
</script>

<style scoped>

</style>