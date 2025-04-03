import { json, useNavigate } from "react-router-dom";

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
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setUser: (currentUser) => { setStore({ user: currentUser }) },
			setCurrentContact: (item) => { setStore({ currentContact: item }) },
			loadFavorites: async () => {
				try {
					if (localStorage.getItem('token')) {
						const response = await fetch(`${process.env.BACKEND_URL}/usersApi/favorites`, {
							headers: {
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							}
						});

						if (response.ok) {
							const data = await response.json();
							setStore({ favorites: data.favorites || [] });
							return;
						}
					}

					// Si no hay token o falla, carga de localStorage
					const localFavs = JSON.parse(localStorage.getItem('favorites')) || [];
					setStore({ favorites: localFavs });
				} catch (error) {
					console.error("Error loading favorites:", error);
				}
			},
			addFavorites: (item) => {
				const store = getStore();
				if (store.favorites.some(fav => fav.id === item.id)) return;

				const updatedFavs = [...store.favorites, item];
				setStore({ favorites: updatedFavs });

				localStorage.setItem('favorites', JSON.stringify(updatedFavs));

				if (localStorage.getItem('token')) {
					fetch(`${process.env.BACKEND_URL}/usersApi/favorites`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({ favorites: updatedFavs })
					}).catch(error => console.error("Sync error:", error));
				}
			},
			removeFavorites: (id) => {
				const store = getStore();
				const updatedFavs = store.favorites.filter(fav => fav.id !== id);
				setStore({ favorites: updatedFavs });

				localStorage.setItem('favorites', JSON.stringify(updatedFavs));

				if (localStorage.getItem('token')) {
					fetch(`${process.env.BACKEND_URL}/usersApi/favorites`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({ favorites: updatedFavs })
					}).catch(error => console.error("Sync error:", error));
				}
			},
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
					user: {
						id: data.results.id,
						username: data.results.username
					}
				})

			},
			logOut: (navigate) => {
				localStorage.removeItem('token')
				setStore({
					isLogged: false,
					user: null
				})
				getActions().showAlert("Logout successful", "danger");
				navigate('/login');
			},
			getUser: async (userId) => {
				const token = localStorage.getItem('token');
				if (!token || !userId) {
				  getActions().showAlert("Debes iniciar sesión primero", "danger");
				  return false;
				}
			
				const uri = `${process.env.BACKEND_URL}/usersApi/users/${userId}`;
				const options = {
				  method: 'GET',
				  headers: {
					Authorization: `Bearer ${token}`
				  }
				};
			
				try {
				  const response = await fetch(uri, options);
				  if (response.status === 401 || response.status === 403) {
					throw new Error('Sesión expirada');
				  }
				  if (!response.ok) {
					throw new Error('Error al obtener datos del usuario');
				  }
				  const data = await response.json();
				  getActions().showAlert("Datos de usuario obtenidos", "success");
				  return data;
				} catch (error) {
				  console.error("Error:", error.message);
				  getActions().showAlert(error.message, "danger");
				  return false;
				}
			},
			accessProtected: async () => {
				const uri = `${process.env.BACKEND_URL}/api/protected`;
				const options = {
				  method: 'GET',
				  headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				  }
				};
			
				try {
				  const response = await fetch(uri, options);
				  if (!response.ok) {
					throw new Error('Token inválido o expirado');
				  }
				  const data = await response.json();
				  getActions().showAlert("El token es válido para esta ruta protegida", "success");
				  return true;
				} catch (error) {
				  console.error('Error:', error.message);
				  getActions().showAlert(error.message, "danger");
				  return false;
				}
			},
			signUp: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/usersApi/users`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error ", response.status, response.statusText)
				}
				const data = await response.json()
				console.log(data)
				getActions().showAlert("Te has registrado exitosamente", "success")
			},

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
				const uri = `${getStore().urlBase}/people/${id}`;
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
				localStorage.setItem('localCharacterId', JSON.stringify(data.result.properties))
			},
			getCardShipsId: async (id) => {
				const uri = `${getStore().urlBase}/starships/${id}`;
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
				localStorage.setItem('localStarShipsId', JSON.stringify(data.result.properties))
			},
			getCardPlanetsId: async (id) => {
				const uri = `${getStore().urlBase}/planets/${id}`;
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
				localStorage.setItem('localStarPlanetsId', JSON.stringify(data.result.properties))

			},

		},


	};
};

export default getState;
