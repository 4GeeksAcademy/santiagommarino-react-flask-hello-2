const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user:null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password) => {
				// try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST', 
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email, 
							password: password
						})
					});
					const data = await response.json();
					console.log(data)
					if (response.ok){
						setStore({user:data, error:null});
					}else{
						setStore({error: data.message})
						console.error("Error during signup", error )
					}
					return data;
				// } catch(error){
				// 	setStore({error:"Error during signup"});
				// 	console.error("Error during signup", error )
				// }
			},
			login:  async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST', 
						headers: {
							'Content-Type': 'application/json'
							
						},
						body: JSON.stringify({email, password})
					});
					const data = await response.json();
					if (response.ok){
						localStorage.setItem('token', data.access_token);
						setStore({user:data, error:null});
					}else{
						setStore({error: data.message})
					}
					return data;
				} catch(error){
					setStore({error:"Error during login"});
					console.error("Error during login", error )
				}
			}, 
			fetchUser:  async () => {
				// try {
					const token = localStorage.getItem('token');
					const response = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: 'GET', 
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'	
						}
					});
					const data = await response.json();
					if (response.ok){
						setStore({user:data, error:null});
					}else{
						console.log({error: data.message})
					}
					return data;
				// } catch(error){
				// 	setStore({error:"Error fetching user"});
				// 	console.error("Error fetching user", error )
				// }
			}, 
		}
	};
};

export default getState;
