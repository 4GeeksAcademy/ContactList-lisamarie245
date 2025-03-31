
const getState = ({ getStore, getActions, setStore }) => {
	const urlBase = "https://playground.4geeks.com/contact/agendas/contactList-lisamarie/contacts"
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
				},
			],

			// CLAVES del CONTACTLIST 
			currentContact: {},
			contacts: [],
			formData: {
				name: "",
				phone: "",
				email: "",
				address: "",
				id: ""
			},

			/////// STARWARS VARIABLES /////////

			urlBase: 'https://www.swapi.tech/api/',
			starPlanets: [],
			starPlanetsDetail: null,
			starCharacters: [],
			starCharacterDetail: null,
			starWarShips: [],
			starShipsDetail: null,
			favorites: [],

		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
			//// CONTACTLIST FUNCIONES
			login: async (dataToSend) => {
				console.log(dataToSend)
			},

			// Leer los contactos en la base de datos
			getContacts: async () => {
				const uri = `${urlBase}`;

				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("error:", response.status, response.statusText)
					return
				}
				const data = await response.json();
				setStore({ contacts: data.contacts })
			},
			// Agregar contactos
			addNewContact: async () => {

				const formContactInfo = getStore().formData;

				const uri = `${urlBase}`;

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(formContactInfo)
				}

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("error:", response.status, response.statusText)
					return
				}
				setStore({
					formData: {
						name: "",
						phone: "",
						email: "",
						address: ""
					}
				})

				getActions().getContacts();
			},
			// ELIMINAR CONTACTOS
			removeContact: async (id) => {

				const uri = `${urlBase}/${id}`;

				const options = {
					method: "DELETE"
				}

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("error:", response.status, response.statusText)
					return
				}
				getActions().getContacts();
			},

			/// FORMULARIO AGREGAR CONTACTOS 
			handleChange: (e) => {
				const store = getStore();
				setStore({
					...store,
					formData: {
						...store.formData,
						[e.target.name]: e.target.value,
					},
				});
			},
			setCurrentContact: (item) => { setStore({ currentContact: item }) },
			// Modificar contactos
			editContact: async (dataContact, id) => {


				const uri = `${urlBase}/${id}`;

				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataContact),
				}

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("error:", response.status, response.statusText)
					return
				}
				getActions().getContacts();
				getActions().setCurrentContact({})
			},


			//// STARWARS DIRECTAMENTE! 
			getCharacters: async () => {
				const uri = `${getStore().urlBase}/people`;

				const options = {
					method: "GET",
				};

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ starCharacters: data.results });
				localStorage.setItem('localStarCharacters', JSON.stringify(data.results))

			},
			getStarPlanets: async () => {
				const uri = `${getStore().urlBase}/planets`;

				const options = {
					method: "GET",
				};

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ starPlanets: data.results })
				localStorage.setItem('localStarplanets', JSON.stringify(data.results))

			},
			getStarShips: async () => {

				const uri = `${getStore().urlBase}/starships`;
				;

				const options = {
					method: "GET"
				}

				const response = await fetch(uri, options);

				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}

				const data = await response.json();
				setStore({ starWarShips: data.results })
				localStorage.setItem('localStarShips', JSON.stringify(data.results))
				console.log(data)
			},

			addFavorites: (item) => {
				setStore({ favorites: [...getStore().favorites, item] })
			},
			removeFavorites: (item) => {
				setStore({ favorites: getStore().favorites.filter((favorite) => favorite != item) })
			},


			// tratar error imagenes
				handleImageError: (e) => {
					e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
				},

				
				getCharacterId: async (id) => {
					const uri = `${ getStore().urlBase}/people/${id}`;
					const options = {
						method: 'GET'
					}
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.log("error", response.status, response.statusText)
						return
					}
					const data = await response.json()
					setStore({ starCharacterDetail: data.result.properties });
					console.log(data.result.properties);
					localStorage.setItem('localCharacterId',JSON.stringify(data.result.properties))
				},
				getCardShipsId: async (id) => {
					const uri = `${ getStore().urlBase}/starships/${id}`;
					const options = {
						method: 'GET'
					}
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.log("error", response.status, response.statusText)
						return
					}
					const data = await response.json()
					setStore({ starShipsDetail: data.result.properties });
					console.log(data.result.properties);
					localStorage.setItem('localStarShipsId',JSON.stringify(data.result.properties))
	
				},
				getCardPlanetsId: async (id) => {
					const uri = `${ getStore().urlBase}/planets/${id}`;
					const options = {
						method: 'GET'
					}
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.log("error", response.status, response.statusText)
						return
					}
					const data = await response.json()
					setStore({ starPlanetsDetail: data.result.properties });
					console.log(data.result.properties);
					localStorage.setItem('localStarPlanetsId',JSON.stringify(data.result.properties))
	
				},



		},


	};
};

export default getState;
