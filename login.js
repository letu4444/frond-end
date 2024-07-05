
function Validation(options) {
	var selectorRules = {};
	// Thực hiện valida lỗi nếu trường hợp sau
	function Valida(inputElement, rule) {
		var ErroElement = inputElement.parentElement.querySelector(".dangnhap1-6-2");
		var erroMEssage;
		var bochuot = $('.dangnhap1-8-1');
		var Rules = selectorRules[rule.selestor];
		//Vòng lặp qua các rule 
		// Nếu có lỗi trả giá trị lỗi và dừng lại
		for (var i = 0; i < Rules.length; i++) {

			erroMEssage = Rules[i](inputElement.value);
			if (erroMEssage) break;

		}
		if (erroMEssage) {
			ErroElement.innerText = erroMEssage;
			inputElement.classList.add("invalid");
			bochuot.attr("disabled", true);
		} else {
			ErroElement.innerText = "";
			inputElement.classList.remove("invalid");
			bochuot.attr("disabled", false);
		}
	}

	var formElement = document.querySelector(options.form);
	if (formElement) {
		// khi nhấn vào buttom
		formElement.onsubmit = function(e) {
			e.preventDefault();
			var isForm = true;
			// vòng lặp chech qua từng rule
			options.rules.forEach(function(rule) {
				var inputElement = formElement.querySelector(rule.selestor);
				var isValida = Valida(inputElement, rule);
				if (isValida) {
					isForm = false;
				}
			});
			console.log(isForm);
			if (isForm) {
				// trương hợp submit js
				if (typeof options.onSubmit === 'function') {
					var enbarInput = formElement.querySelectorAll('[name]');
					let name = '';
					let pass = '';
					var formValid = Array.from(enbarInput).reduce(function(values, input) {
						if (input.name == "username") {
							name = input.value;
						} else {
							pass = input.value;
						}
						return (values[input.name] = input.value) && values;
					}, {});
					invaltion();
					options.onSubmit(formValid);
					console.log(formValid);
				
			

   /* var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login/check?username="+formValid.username+"&password="+formValid.password, false);
   // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Xử lý phản hồi thành công
                console.log("Login successful");
             //   fetchData("http://localhost:8086/trangchu","post",formValid);

            } else {
                // Xử lý phản hồi không thành công
                console.error("Login failed");
                 window.location.href = "http://localhost:9000/login";
            }
        }
    };
    xhr.send();*/
			//		loginUser(formValid);
					//loginUser(name, pass);
					 formElement.submit();
				
					

				
					

				}
				//Trường hợp submit mặc định
				//else{
				//  formElement.submit(); 
				//}

			}
		}

		///Lắng nghe các sự kiện trong button
		options.rules.forEach(function(rule) {
			//Lưu lại các rule trong test để kiểm tra
			if (Array.isArray(selectorRules[rule.selestor])) {
				selectorRules[rule.selestor].push(rule.test);

			} else {
				selectorRules[rule.selestor] = [rule.test];
			}
			var inputElement = formElement.querySelector(rule.selestor);
			var ErroElement = inputElement.parentElement.querySelector(".dangnhap1-6-2");
			if (inputElement) {
				inputElement.onblur = function() {
					Valida(inputElement, rule);
					if (inputElement.value == "") {
						inputElement.parentElement.querySelector(".dangnhap1-5-1").style.display = "none";
					}
				}
				inputElement.oninput = function() {
					// var D = document.createTextNode(S.append('<div class="dangnhap1-5-1"></div>'));
					ErroElement.innerText = "";
					inputElement.classList.remove("invalid");
					inputElement.setAttribute("value", inputElement.value);
					inputElement.parentElement.querySelector(".dangnhap1-5-1").style.display = "block";
				}
			}

		});
	}
}



Validation.isRequired = function(selestor, message) {
	return {
		selestor: selestor,
		test: function(value) {
			return value.trim() ? undefined : message || "Vui lòng nhập trường này!"
		}
	};
}
Validation.isName = function(selestor, min, max) {
	return {
		selestor: selestor,
		test: function(value) {
			if (min <= value.length && value.length <= max) {
			} else {
				return `Vui lònng nhập tối thiểu ${min} - ${max} kí tự`;
			}
		}
	};
}
Validation.isminLength = function(selestor, min) {
	return {
		selestor: selestor,
		test: function(value) {
			return value.length >= min ? undefined : `Vui lònng nhập đủ ${min} kí tự`;
		}
	};

}
/// phần của đang nhập
$(".dangnhap1-5-2").click(function() {
	$(this).toggleClass("_4");
	if ($(this).is("._4")) {
		$("#password").attr("type", "text");
	} else {
		$("#password").attr("type", "password");
	}
});
//phầng đang nhập khi nhấn vào input
$(".dangnhap1-5-1").click(function() {
	$(this).parent().find(".dangnhap1-6-3").attr("value", "");
	$(this).parent().find(".dangnhap1-6-3").val("");
	$(this).css("display", "none");
});

function invaltion() {
	var isloi = $(".loi");
	if (isloi) {
		setTimeout(function() {
			$(".dangnhap2-6").removeClass("loi");
		}, 500);
	}
}

//ajax

//Nơi gửi dữ liệu về server
async function loginUser(data) {
	// Gửi yêu cầu POST đến controller

    
   
	/*try {
		const response = await fetch("/login/check?username="+data.username+"&password="+data.password, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			// body: JSON.stringify(data),
		});

		// Kiểm tra xem yêu cầu có thành công hay không
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		

		// Parse JSON từ phản hồi
		const data = await response.json();
       // setTimeout(function() {
               window.location.href = "http://localhost:8082/trangchu";
         //    }, 3000);
		// Lưu trữ mã thông báo vào localStorage
		// localStorage.setItem('accessToken', data);
		// localStorage.setItem('refreshToken', data.refreshToken);

		// Thực hiện các thao tác khác sau khi đăng nhập thành công
	} catch (error) {
		console.error('Login failed:', error);
	}*/
	
}
// Dữ liệu cần gửi đi
function fetchData(url, method, data) {
    // Tạo promise để xử lý các tác vụ gọi Fetch API
   $.ajax({
		  url: url,
		  method: method,
		  data: data,
        success:function(rep){
             window.location.href = "http://localhost:8082/trangchu";
        },
        error:function(err){
            console.log(err);
        }

		});
}

/*const instance = axios.create({
	baseURL: 'http://localhost:8083',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'Acess-Control-Allow-Origin': '*',
		'Accept': "application/json"
	}
});


// Thêm interceptor để thêm token vào header của mọi yêu cầu
instance.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			//instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
			 config.headers.Authorization =  `Bearer ${accessToken}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
*/