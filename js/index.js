/**
 * Created by SD on 29.05.2017.
 */
var server = 'http://helloworld.filonitta.fe4.a-level.com.ua/api/v1';
var app = new Vue({
	el: '#app',
	data: {
		message: 'Список!',
		studentList:[],
		userUpdateData:{
			email: '',
			firstname: '',
			gitlab: '',
			group_id: '',
			id: '',
			lastname: ''
		},
		userCreatData:{
			email: '',
			firstname: '',
			gitlab: '',
			group_id: '',
			id: '',
			lastname: ''
		}
	},
	methods:{
		getUserData:function (userId) {
			$.ajax({
				url: server + '/students/' + userId,
				method: 'GET',
				success: function (responce) {
					app.userUpdateData= responce;
				},
				error: function (responce) {
				}
			})
		},
		userUpdate:function(){
			console.log(this.userUpdateData.id);
			var that = this;
			$.ajax({
				url: server + '/students/' + that.userUpdateData.id,
				method: 'PUT',
				data: that.userUpdateData,
				success: function(responce){
					var student = that.studentList.filter(function(student){
						return student.id === that.userUpdateData.id;
					})[0];
					student.name = responce.lastname + ' ' + responce.firstname;
				},
				error: function(responce){}
			});
		},
		userDelete:function () {
			var that=this;
			$.ajax({
				url:server+'/students/'+that.userUpdateData.id,
				method:'DELETE',
				success:function (responce) {
					var student= that.studentList.filter(function (student) {
						return student.id === that.userUpdateData.id;
					})[0];
					that.studentList.splice(that.studentList.indexOf(student),1);

					that.userUpdateData={};
					},
				error:function (responce) {

				}
			})
		},
		creatUser:function () {
			var that=this;
		$.ajax({
		url:server+'/students',
		method:'POST',
		data:that.userCreatData,
		success:function (responce) {
			that.userCreatData={};
			
		},
		error: function(responce){

					}
				}
			)}
	}
});


$.ajax({
	url: server + '/students',
	method: 'GET',
	success: function(responce) {
		app.studentList=responce;
	},
	error: function(responce) {
		console.log('responce', responce);
	}
});
