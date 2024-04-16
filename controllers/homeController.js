// Methods to be executed on routes 
const method1 = (req, res)=>{ 
	res.send("Hello, Welcome to our Page"); 
} 

const method2 = (req, res)=>{ 
	res.send("Hello, This was a method2 Request from controller"); 
} 

// Export of all methods as object 
module.exports = { 
	method1, 
	method2 
}
