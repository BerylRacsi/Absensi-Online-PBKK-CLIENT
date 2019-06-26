const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
var flash = require('connect-flash');

const app = express();
const router = express.Router();

/*Handlebars View Engine*/

// Register handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Register Handlebars view engine
app.engine('handlebars', exphbs());
// Use Handlebars view engine
app.set('view engine', 'handlebars');

/*Body Parser Middleware*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*Mongo Data Base*/

// connect to mongodb atlas
mongoose.connect('mongodb+srv://berylhartono:anakdewa666@myawesomeapp-uzrvu.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }); // connect to our database

/*Cookie Parser*/
app.use(cookieParser());
app.use(session({
	maxAge: 60000,
    secret: 'apaya',
    resave: false,
    saveUninitialized: false
}));

/*Express Flash Messages*/
app.use(flash());

/*Models*/
var User = require('./models/users');


app.get('/', (req,res)=>{
	res.redirect('/login');
});

app.get('/index', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		console.log(userNRP.nrp);
		res.render('index',  userNRP);
	}
	else {
		res.redirect('/');
	}
});

app.get('/mahasiswa', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		var info = req.query.test;
		res.render('mahasiswa', {nrp: userNRP.nrp,message: info});
	}
	else {
		res.redirect('/');
	}
});

app.get('/matkul', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		var info = req.query.test;
		res.render('matkul', {nrp: userNRP.nrp,message: info});
	}
	else {
		res.redirect('/');
	}
});

app.get('/peserta', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		var info = req.query.test;
		res.render('peserta', {nrp: userNRP.nrp,message: info});
	}
	else {
		res.redirect('/');
	}
});

app.get('/jadwal', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		var info = req.query.test;
		res.render('jadwal', {nrp: userNRP.nrp,message: info});
	}
	else {
		res.redirect('/');
	}
});

app.get('/absen', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		var info = req.query.test;
		res.render('absen', {nrp: userNRP.nrp,message: info});
	}
	else {
		res.redirect('/');
	}
});

app.get('/kuliahsemester', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		res.render('kuliahsemester',  userNRP);
	}
	else {
		res.redirect('/');
	}
});

app.get('/kuliahpertemuan', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		res.render('kuliahpertemuan',  userNRP);
	}
	else {
		res.redirect('/');
	}
});

app.get('/mahasiswakuliah', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		res.render('mahasiswakuliah',  userNRP);
	}
	else {
		res.redirect('/');
	}
});

app.get('/mahasiswasemester', (req,res) => {
	if (req.session.nrp) {
		var userNRP = req.session,nrp;
		res.render('mahasiswasemester',  userNRP);
	}
	else {
		res.redirect('/');
	}
});

app.get('/logout', (req,res,next)=>{
	if (req.session) {
		req.session.destroy(function(err){
			if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
		});
	}
});

router.route('/rekapkuliahsemester')
	.post(function(req,res){
		var kodeMatkul = req.body.kodeMatkul;
		console.log(kodeMatkul);
		//res.redirect('http://solork.xyz:3000/rekap/'+kodeMatkul);
		request.get('http://solork.xyz:3000/rekap/'+kodeMatkul,
		function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		var userNRP = req.session,nrp;
    		res.render('rekapkuliahsemester', {test:array1, nrp: userNRP.nrp})	
		})
	});

router.route('/rekapkuliahpertemuan')
	.post(function(req,res){
		var kodeMatkul = req.body.kodeMatkul;
		var pertemuan = req.body.pertemuan;
		//res.redirect('http://solork.xyz:3000/rekap/'+kodeMatkul);
		request.get('http://solork.xyz:3000/rekap/'+kodeMatkul+'/'+pertemuan,	
		function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		var userNRP = req.session,nrp;
    		res.render('rekapkuliahpertemuan', {test:array1, nrp: userNRP.nrp})
		})
	});

router.route('/mahasiswaperkuliah')
	.post(function(req,res){
		var kodeMatkul = req.body.kodeMatkul;
		var nrp = req.body.nrp;
		//res.redirect('http://solork.xyz:3000/rekap/'+kodeMatkul);
		request.get('http://solork.xyz:3000/rekapmahasiswa/'+nrp+'/'+kodeMatkul,
		function(error, response, body){
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		var userNRP = req.session,nrp;
    		res.render('rekapmahasiswakuliah', {test:array1, nrp: userNRP.nrp})
		})
	});

router.route('/mahasiswapersemester')
	.post(function(req,res){
		var semester = req.body.semester;
		var nrp = req.body.nrp;
		//res.redirect('http://solork.xyz:3000/rekap/'+kodeMatkul);
		request.get('http://solork.xyz:3000/rekapmahasiswasem/'+nrp+'/'+semester,
		function(error, response, body){
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		var userNRP = req.session,nrp;
    		res.render('rekapmahasiswasemester', {test:array1, nrp: userNRP.nrp})
		})
	});

router.route('/tambahmahasiswa')
	.post(function(req,res){		
		var nrp = req.body.nrp;
  		var name = req.body.name;
  		var password = req.body.password;

  		request.post({
		    headers: {'content-type' : 'application/json'},
		    url : 'http://solork.xyz:3000/tambahmahasiswa',
		    form: {nrp: nrp, name: name, password: password}, 
		},
    	function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		if (array1.status == 200) {
    			console.log('200 bro')
    			res.redirect('/mahasiswa/?test='+'Penambahan Mahasiswa Baru '+name+' Sukses')
    		}
    		else {
    			console.log('selain 200')
    			res.redirect('/mahasiswa/?test='+array1.message)	
    		}
		})
	});

router.route('/tambahmatkul')
	.post(function(req,res){		
		var kodeMatkul = req.body.kodeMatkul;
  		var name = req.body.name;
  		var semester = req.body.semester;
  		var kelas = req.body.kelas;

  		request.post({
		    headers: {'content-type' : 'application/json'},
		    url : 'http://solork.xyz:3000/tambahmatkul',
		    form: {kodeMatkul: kodeMatkul, name: name, kelas: kelas, semester: semester}, 
		},
    	function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		if (array1.status == 200) {
    			console.log('200 bro')
    			res.redirect('/matkul/?test='+'Penambahan Mata Kuliah '+kodeMatkul+' Sukses')
    		}
    		else {
    			console.log('selain 200')
    			res.redirect('/matkul/?test='+array1.message)	
    		}
		})
	});

router.route('/tambahjadwal')
	.post(function(req,res){		
		var kodeMatkul = req.body.kodeMatkul;
  		var pertemuan = req.body.pertemuan;
  		var ruang = req.body.ruang;
  		var masuk = req.body.masuk;
  		var selesai = req.body.selesai;

  		request.post({
		    headers: {'content-type' : 'application/json'},
		    url : 'http://solork.xyz:3000/tambahjadwal',
		    form: {	
		    	kodeMatkul: kodeMatkul, 
		    	pertemuan: pertemuan, 
		    	ruang: ruang, 
		    	masuk: masuk,
		    	selesai: selesai
		    }, 
		},
    	function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		if (array1.status == 200) {
    			console.log('200 bro')
    			res.redirect('/jadwal/?test='+'Penambahan Jadwal ke Mata Kuliah '+kodeMatkul+' Sukses')
    		}
    		else {
    			console.log('selain 200')
    			res.redirect('/jadwal/?test='+array1.message)	
    		}
		})
	});

router.route('/tambahpeserta')
	.post(function(req,res){		
		var nrp = req.body.nrp;
  		var kodeMatkul = req.body.kodeMatkul;

  		request.post('http://solork.xyz:3000/tambahpeserta/'+kodeMatkul+'/'+nrp,
    	function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		if (array1.status == 200) {
    			console.log('200 bro')
    			res.redirect('/peserta/?test='+'Penambahan User '+nrp+' ke Mata Kuliah '+kodeMatkul+' Sukses')
    		}
    		else {
    			console.log('selain 200')
    			res.redirect('/peserta/?test='+array1.message)	
    		}
		})
	});

router.route('/absen')
	.post(function(req,res){
		var nrp = req.body.nrp;
  		var ruang = req.body.ruang;

  		request.post('http://solork.xyz:3000/absen/'+ruang+'/'+nrp,
  		function(error, response, body) {
			console.log(JSON.parse(body));
    		const array1 = JSON.parse(body);
    		if (array1.status == 200) {
    			console.log('200 bro')
    			res.redirect('/absen/?test='+nrp+' berhasil absen di ruang '+ruang)
    		}
    		else {
    			console.log('selain 200')
    			res.redirect('/absen/?test='+array1.message)	
    		}
		})
	});

router.route('/register')
	.get(function(req,res){
		if (req.session.nrp) {
			res.redirect('/index');
		}
		else {
			res.render('register',{layout: false});
		}
	})

	.post(function(req,res){
		var user = new User();      	// new instance from Mahasiswa model
        user.name = req.body.name;  			// set mhs name 
        user.nrp = req.body.nrp;				// set mhs nrp
        user.password = req.body.password;	// set mhs password

        // save the mhs
        user.save(function(err) {
            if (err)
                res.send(err);

            res.redirect('/login'); //return message in json if POST success
        });
	});

router.route('/login')
	.get(function(req,res){
		if (req.session.nrp) {
			res.redirect('/index');
		}
		else {
			res.render('login', {layout: false});
		}
	})

	.post(function(req,res){
		User.find({
			nrp: req.body.nrp,
			password: req.body.password,
		}, function(err,response){
			if (err) throw err;
			if (response.length > 0){
				req.session.nrp = req.body.nrp;
			}
			res.redirect('/index');
		});
	});


app.use('/', router);

app.listen(3000, () => {
  console.log('Example app is running → PORT 3000');
});