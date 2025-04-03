import { json } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	const agendaSlug = "contactList-lisamarie";
    const urlBaseAgenda = `https://playground.4geeks.com/contact/agendas/${agendaSlug}`;
    const urlBaseContacts = `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`;
	return {
		store: {
			// CLAVES del CONTACTLIST 
			currentContact: {},
			contacts: [],
			user: {}, 
			isLogged: false,
			formData: {
				name: "",
				phone: "",
				email: "",
				address: "",
				id: ""
			},
			agenda: {
				slug: "contactList-lisamarie",
			  },
				alert: {
					show: false,
					type: "info",
					message: ""
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
			showAlert: (message, type = "success") => {
				setStore({
					alert: {
						show: true,
						type,
						message
					}
				});
				// Ocultar después de 5 segundos
				setTimeout(() => getActions().hideAlert(), 5000);
			},
			hideAlert: () => {
				setStore({
					alert: {
						...getStore().alert,
						show: false
					}
				});
			},
			//// CONTACTLIST FUNCIONES
			login: async (dataToSend) => {
				console.log(dataToSend)

				const uri = `${process.env.BACKEND_URL}/api/login`;
				console.log(uri)
				const options = {
					method: 'POST',
					headers: { 
						"Content-Type": "application/json"
 					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);

				if (!response.ok) { 
					const errorMsg = response.status === 401 
						? "Email o contraseña incorrectos" 
						: "Error en el servidor";
					
					getActions().showAlert(errorMsg, "danger");
					return;
				} 
				
				const data = await response.json();
				localStorage.setItem('token', data.access_token)
				getActions().showAlert("Login exitoso", "success");
				setStore({
					isLogged: true,
					user: data.results
				})

			},
			access_protected: async () => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = { 
					method: 'GET'
				}
				 
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}

				const data = await response.json()
				getActions().showAlert("Ruta protegida", "success");
			},

			// Leer los contactos en la base de datos
			getContacts: async () => {
				const uri = `${urlBaseContacts}`;

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

			addAgenda: async () => { 
                try {
                    const checkResponse = await fetch(urlBaseAgenda);
                    
                    if (checkResponse.ok) {
                        console.log("La agenda ya existe");
                        return true;
                    }

                    const createResponse = await fetch(urlBaseAgenda, {
                        method: "POST",  
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ slug: agendaSlug })
                    });

                    if (!createResponse.ok) {
                        const errorData = await createResponse.json();
                        throw new Error(errorData.message || "Error al crear agenda");
                    }

                    const data = await createResponse.json();
                    console.log("Agenda creada:", data);
                    return true;
                    
                } catch (error) {
                    console.error("Error en addAgenda:", error);
                    setStore({ error: error.message });
                    return false;
                }
            },

            addNewContact: async () => {
                try {
                    const agendaReady = await getActions().addAgenda();
                    if (!agendaReady) {
                        throw new Error("No se pudo crear/verificar la agenda");
                    }

                    const formContactInfo = getStore().formData;
                    if (!formContactInfo.name || !formContactInfo.phone || !formContactInfo.email) {
                        throw new Error("Nombre, teléfono y email son campos requeridos");
                    }

                    const response = await fetch(urlBaseContacts, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formContactInfo)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Error al crear contacto");
                    }

                    const data = await response.json();
                    
                    // 4. Resetear formulario
                    setStore({
                        formData: {
                            name: "",
                            phone: "",
                            email: "",
                            address: "",
                            id: ""
                        }
                    });

                    // 5. Actualizar lista de contactos
                    await getActions().getContacts();
                    
                    return data;
                    
                } catch (error) {
                    console.error("Error en addNewContact:", error);
                    setStore({ error: error.message });
                    throw error;
                }
            },

			// ELIMINAR CONTACTOS
			removeContact: async (id) => {

				const uri = `${urlBaseContacts}/${id}`;

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


				const uri = `${urlBaseContacts}/${id}`;

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
