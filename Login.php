<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Registration</title>
	<link rel="stylesheet" href="login.css">
	<meta name="viewport" content="width=device-width, intial-scale=1.0">
</head>
<body>
	<div class="header">
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Fruktur&display=swap" rel="stylesheet">
<div class = "container">
	<div class="navbar">
	 
	<nav>
		<ul>
			<li><a href ="index.php">Home</a></li>
			<li><a href ="Categories.php">Categories</a></li>
			<li><a href ="About Us.php">About</a></li>
			<li><a href ="Contact Us.php">Contact</a></li>
			<li><a href = "Login.php">Login</a></li>
		</ul>
	</nav>
  </div>
	</div>
		</div>
	<div class = "reg">
	<div class = "reg_container">
		<div class="reg_title">Login</div>
		<form name = "Login" action="" onSubmit="return validateForm()" method="post">
		  <div class = "user-details">
			<div class = "input-box">
				<span class = "details">Username</span>
				<input type="text" name ="username" placeholder="Enter your username/email">
			</div>
			  	<div class = "input-box">
				<span class = "details">Password&nbsp;</span>
				<input type="password" name ="password" placeholder="Enter your password">
				</div>
		  </div>			
			<div class = "button">
				<button type="submit">Login</button>
			</div>
			<div class="register">
			  <a href="Registration.html">New user? Sign up to create your account</a>
				
				</div>
		</form>		
		</div>
	</div>
	
	<script>
	function validateForm()
		{
			let x = document.forms["Login"]["username"].value;
			let y = document.forms["Login"]["password"].value;
			
			if(x =="" && y == "")
				{
					alert("Username must be filled out");
					alert("Password must be filled out");
					return false;
				}
			else if (x=="")
				{
					alert("Username must be filled out");
					return false;
				}
			else if(y =="")
				{
					alert("Password must be filled out");
					return false;
				}
		}
	</script>
</body>
</html>