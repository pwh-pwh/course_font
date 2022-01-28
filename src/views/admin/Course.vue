<template>
  <div id="course">
    <p>
      <button class="btn btn-white btn-default btn-round" @click="add">
        <i class="ace-icon fa fa-edit red2"></i>
        新增
      </button>
      &nbsp;
      <button class="btn btn-white btn-default btn-round" @click="getCourseList(1)">
        <i class="ace-icon fa fa-refresh red2"></i>
        刷新
      </button>
    </p>
    <pagination ref="pagination" :list="getCourseList"></pagination>

    <table id="simple-table" class="table  table-bordered table-hover">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>课程ID概述</th>
        <th>时长</th>
        <th>价格</th>
        <th>图片</th>
        <th>等级</th>
        <th>收费</th>
        <th>状态</th>
        <th>报名数</th>
        <th>顺序</th>
        <th>创建时间</th>
        <th>修改时间</th>
      </tr>
      </thead>

      <tbody>

      <tr v-for="course in courses">
        <td>{{course.id}}</td>
        <td>{{course.name}}</td>
        <td>{{course.summary}}</td>
        <td>{{course.time}}</td>
        <td>{{course.price}}</td>
        <td>{{course.image}}</td>
        <td>{{course.level}}</td>
        <td>{{course.charge}}</td>
        <td>{{course.status}}</td>
        <td>{{course.enroll}}</td>
        <td>{{course.sort}}</td>
        <td>{{course.createAt}}</td>
        <td>{{course.updateAt}}</td>

        <td>
          <div class="hidden-sm hidden-xs btn-group">
            <button class="btn btn-xs btn-info" @click="edit(course)">
              <i class="ace-icon fa fa-pencil bigger-120"></i>
            </button>
            <button class="btn btn-xs btn-danger" @click="del(course.id)">
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
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.name" class="form-control" placeholder="名称">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">概述</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.summary" class="form-control" placeholder="概述">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">时长</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.time" class="form-control" placeholder="时长">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">价格</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.price" class="form-control" placeholder="价格">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">图片</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.image" class="form-control" placeholder="图片">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">等级</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.level" class="form-control" placeholder="等级">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">收费</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.charge" class="form-control" placeholder="收费">
                </div>
              </div>


              <div class="form-group">
                <label class="col-sm-2 control-label">创建时间</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.createAt" class="form-control" placeholder="创建时间">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">收费</label>
                <div class="col-sm-10">
                  <select v-model="course.charge" class="form-control">
                    <option v-for="o in CHARGE" v-bind:value="o.key">
                      {{o.value}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">更新时间</label>
                <div class="col-sm-10">
                  <input type="text" v-model="course.updatedAt" class="form-control" placeholder="更新时间">
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
  name: "Course",
  data() {
    return {
      courses: [],
      course: {},
      CHARGE: [{key:"C",value:"收费"},{key:"F",value:"免费"}]
    }
  },
  components: {
    Pagination
  },
  mounted() {
    // this.$parent.activeSidebar("business-course-sidebar")
    let _this = this
    _this.$refs.pagination.size=5;
    console.log("course")
    _this.getCourseList(1)
  },
  methods: {
    getCourseList(page) {
      let _this = this
      Loading.show()
      _this.axios.post(process.env.VUE_APP_SERVER+"/business/admin/course/list",{
        current: page,
        size: _this.$refs.pagination.size
      }).then((response)=> {
        Loading.hide()
        console.log(response.data.content)
        _this.courses = response.data.content.records
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
      _this.axios.post(process.env.VUE_APP_SERVER+"/business/admin/course/save",_this.course).then((response)=> {
        let resp = response.data
        Loading.hide()
        console.log(resp)
        if (resp.success) {
          console.log("保存",response.data.content)
          $("#form-modal").modal("hide")
          //刷新
          _this.getCourseList(1)
          toast.success("保存成功")
        }

      })
    },
    edit(course) {
      let _this = this
      _this.course = course
      $("#form-modal").modal("show");
    },
    del(id) {
      let _this = this

      Confirm.show("确认删除吗?",function () {
        Loading.show()
        _this.axios.delete(process.env.VUE_APP_SERVER+"/business/admin/course/delete/"+id)
            .then((respond)=> {
              Loading.hide()
              let resp = respond.data
              if (resp.success) {
                _this.getCourseList(1)
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