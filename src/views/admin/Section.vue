<template>
  <div id="section">
    <p>
      <button class="btn btn-white btn-default btn-round" @click="add">
        <i class="ace-icon fa fa-edit red2"></i>
        新增
      </button>
      &nbsp;
      <button class="btn btn-white btn-default btn-round" @click="getSectionList(1)">
        <i class="ace-icon fa fa-refresh red2"></i>
        刷新
      </button>
    </p>
    <pagination ref="pagination" :list="getSectionList"></pagination>

    <table id="simple-table" class="table  table-bordered table-hover">
      <thead>
      <tr>
        <th>ID</th>
        <th>标题</th>
        <th>课程ID</th>
        <th>大章ID</th>
        <th>视频</th>
        <th>时长</th>
        <th>收费</th>
        <th>顺序</th>
        <th>创建时间</th>
        <th>修改时间</th>
      </tr>
      </thead>

      <tbody>

      <tr v-for="section in sections">
        <td>{{section.id}}</td>
        <td>{{section.title}}</td>
        <td>{{section.courseId}}</td>
        <td>{{section.chapterId}}</td>
        <td>{{section.video}}</td>
        <td>{{section.time}}</td>
        <td>{{section.charge}}</td>
        <td>{{section.sort}}</td>
        <td>{{section.createAt}}</td>
        <td>{{section.updateAt}}</td>

        <td>
          <div class="hidden-sm hidden-xs btn-group">
            <button class="btn btn-xs btn-info" @click="edit(section)">
              <i class="ace-icon fa fa-pencil bigger-120"></i>
            </button>
            <button class="btn btn-xs btn-danger" @click="del(section.id)">
              <i class="ace-icon fa fa-trash-o bigger-120"></i>
            </button>
          </div>
        </td>

      </tr>

      </tbody>
    </table>

    <div id="form-modal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">

              <div class="form-group">
                <label class="col-sm-2 control-label">标题</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.title" class="form-control" placeholder="标题">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">课程ID</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.courseId" class="form-control" placeholder="课程ID">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">大章ID</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.chapterId" class="form-control" placeholder="大章ID">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">视频</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.video" class="form-control" placeholder="视频">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">时长</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.time" class="form-control" placeholder="时长">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">创建时间</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.createAt" class="form-control" placeholder="创建时间">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">更新时间</label>
                <div class="col-sm-10">
                  <input type="text" v-model="section.updatedAt" class="form-control" placeholder="更新时间">
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" @click="save" class="btn btn-primary">保存</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

  </div>
</template>

<script>
import Pagination from "@/components/pagination";

export default {
  name: "Section",
  data() {
    return {
      sections: [],
      section: {}
    }
  },
  components: {
    Pagination
  },
  mounted() {
    // this.$parent.activeSidebar("business-section-sidebar")
    let _this = this
    _this.$refs.pagination.size=5;
    console.log("section")
    _this.getSectionList(1)
  },
  methods: {
    getSectionList(page) {
      let _this = this
      Loading.show()
      _this.axios.post(process.env.VUE_APP_SERVER+"/business/admin/section/list",{
        current: page,
        size: _this.$refs.pagination.size
      }).then((response)=> {
        Loading.hide()
        console.log(response.data.content)
        _this.sections = response.data.content.records
        _this.$refs.pagination.render(page,response.data.content.total)
      })
    },
    add() {
      // let _this = this
      $("#form-modal").modal("show");
    },
    save() {
      let _this = this
      //保存校验
      /*if (!Validator.require(_this.chapter.name,"名称")
          ||!Validator.require(_this.chapter.courseId,"课程ID")
          ||!Validator.require(_this.chapter.courseId,"课程ID",1,8)){
        return;
      }*/

      Loading.show()
      _this.axios.post(process.env.VUE_APP_SERVER+"/business/admin/section/save",_this.section).then((response)=> {
        let resp = response.data
        Loading.hide()
        console.log(resp)
        if (resp.success) {
          console.log("保存",response.data.content)
          $("#form-modal").modal("hide")
          //刷新
          _this.getSectionList(1)
          toast.success("保存成功")
        }

      })
    },
    edit(section) {
      let _this = this
      _this.section = section
      $("#form-modal").modal("show");
    },
    del(id) {
      let _this = this

      Confirm.show("确认删除吗?",function () {
        Loading.show()
        _this.axios.delete(process.env.VUE_APP_SERVER+"/business/admin/section/delete/"+id)
            .then((respond)=> {
              Loading.hide()
              let resp = respond.data
              if (resp.success) {
                _this.getSectionList(1)
              }
            })

        toast.success("删除成功")
      })



    }
  }
}
</script>

<style scoped>

</style>