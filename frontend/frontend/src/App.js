import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const Getcatalog = () => {
        const navigate = useNavigate(); 
        const [recipes, setRecipes] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
    
        useEffect(() => {
            fetch("http://localhost:8081/listRecipes")
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show Catalog of Recipes :", data);
                    setRecipes(data);
                });
        }, []);
    
        const handleSearch = () => {
            // Filter recipes based on the search term
            const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(filteredRecipes);
        };
    
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };
    
        const handleClick = (recipeId) => {
            console.log("Clicked recipeId=", recipeId);
            navigate(`/getcatalogid/${recipeId}`);
        };
    
       
    
        return (
            <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 navbar-custom"> {/* Apply navbar-custom class */}
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div style={{  paddingLeft: '305px'}}className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto"> {/* Center align the buttons */}
                                <li className="nav-item">
                                    <Link className="nav-link active ms-4" aria-current="page" to="/getcatalog"
                                        style={{ color: '#000033' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/postcatalog" style={{ color: '#000033' }}>Add Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/putcatalog" style={{ color: '#000033' }}>Modify Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/deletecatalog" style={{ color: '#000033' }}>Delete Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/studentinfoview" style={{ color: '#000033' }}>Team Members</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Search Bar */}
                        <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form>
                        {/* End of Search Bar */}
                    </div>
                </nav>
    
                {/* Add padding-top to the body to avoid content being overlapped by the fixed navbar */}
                <div style={{ paddingTop: '80px' }}> {/* Increased paddingTop to accommodate the taller navbar */}
                    <div className="container mt-4">
                        <div className="row">
                            {(searchTerm && searchResults.length > 0 ? searchResults : recipes).map((el) => (
                                <div key={el.recipeId} className="col-md-4 mb-3" onClick={() => handleClick(el.recipeId)}>
                                    <div className="card border-0 shadow-sm">
                                        <img width="300" height="300" src={el.url} className="card-img-top" alt="recipe" />
                                        <div className="card-body">
                                            <h5 className="card-title">{el.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    


    const StudentInfoView = () => {
        const navigate = useNavigate();

        return (
          <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-custom navbar-expand-lg navbar-light bg-light rounded-3">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-center"
                  id="navbarNav"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link active ms-4"
                        aria-current="page"
                        to="/getcatalog"
                        style={{ color: "#000033" }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link ms-4"
                        to="/postcatalog"
                        style={{ color: "#000033" }}
                      >
                        Add Item
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link ms-4"
                        to="/putcatalog"
                        style={{ color: "#000033" }}
                      >
                        Modify Item
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link ms-4"
                        to="/deletecatalog"
                        style={{ color: "#000033" }}
                      >
                        Delete Item
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link ms-4"
                        to="/studentinfoview"
                        style={{ color: "#000033" }}
                      >
                        Team Members
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
                </nav>
                <div style={{ paddingTop: "70px" }}>
                <div className="student-info-box">
    <div className="student-info-container">
        <h1>Student Information</h1>
        <div className="info-section">
            <p><strong>Names:</strong> Ellery Sabado, Owen Jewell</p>
            <p><strong>Emails:</strong> elsabado@iastate.edu, ojewell@iastate.edu</p>
            <p><strong>Course Number:</strong> 319</p>
            <p><strong>Course Name:</strong> Com S</p>
            <p><strong>Date:</strong> 4/27/2024</p>
            <p><strong>Professor Name:</strong> Ali Jannesari</p>
        </div>
        <div className="project-introduction">
            <h2>Project Introduction</h2>
            <p>Welcome to our project! In this application, we've created a comprehensive catalog management system that allows users to view, add, modify, and delete recipes. With a sleek and intuitive interface, users can effortlessly navigate through the catalog, making it an ideal solution for businesses looking to manage their recipe inventory efficiently. Our team, comprised of Ellery Sabado and Owen Jewell, developed this project for the course COM S 319 under the guidance of Professor Ali Jannesari. We hope you find our application useful and user-friendly!</p>
        </div>
        <button className="btn btn-primary rounded-pill" onClick={() => navigate('/getcatalog')}>Back to Catalog</button>
    </div>
</div>
                </div>
            </div>
        );
    };

    const GetcatalogidComponent = () => {
        const [oneRecipe, setOneRecipe] = useState([]);
        const navigate = useNavigate();
        const { id } = useParams();
    
        useEffect(() => {
            console.log("RecipeId from URL=", id);
            if (id) {
                fetch(`http://localhost:8081/${id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Show one recipe :", data);
                        setOneRecipe([data]);
                    });
            }
        }, [id]);
    
        return (
            <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3"
                    style={{ backgroundColor: '#FFE4C9!important', width: '100%', position: 'fixed', top: '0', zIndex: '1000', paddingLeft: '15px', paddingRight: '15px' }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active ms-4" aria-current="page" to="/getcatalog"
                                        style={{ color: '#000033' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/postcatalog" style={{ color: '#000033' }}>Add Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/putcatalog" style={{ color: '#000033' }}>Modify Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/deletecatalog" style={{ color: '#000033' }}>Delete Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/studentinfoview" style={{ color: '#000033' }}>Team Members</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
    
                <div style={{ backgroundColor: '#FFF7F1', paddingTop: '80px'  }}>
                    <div style={{ backgroundColor: '#FFF7F1'}} className="container mt-4">
                        <div style={{ backgroundColor: '#FFF7F1'}} className="row justify-content-center">
                            {oneRecipe.map((el) => (
                                <div style={{ backgroundColor: '#FFF7F1'}} key={el.recipeId} className="col-md-8 mb-3"> {/* Increased column width */}
                                    <div style={{ backgroundColor: '#FFF7F1'}} className="card border-0">
                                        <div className="card-pink-box">
                                            <img width="600" height="600" src={el.url} className="card-img-top" alt="recipe" />
                                            <h1 className="card-title" style={{ color: 'white' }}><strong>{el.title}</strong></h1>
                                            <h5 className="card-description" style={{ color: 'white' }}>{el.description}</h5>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6"> {/* Adjusted column width */}
                                                <div className="card-tan-box">
                                                    <h5 className="card-subtitle">Ingredients</h5>
                                                    <p className="card-ingredients">{el.ingredients}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6"> {/* Adjusted column width */}
                                                <div className="card-tan-box">
                                                    <h5 className="card-subtitle">Directions</h5>
                                                    <p className="card-directions">{el.directions}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const Postcatalog = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            recipeId: '',
            title: '',
            url: '',
            description: '',
            ingredients: '',
            directions: '',
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            fetch("http://localhost:8081/addRecipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.status !== 200) {
                    return response.json()
                        .then(errData => {
                            throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                        })
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert("Item added successfully!");
            })
            .catch(error => {
                console.error('Error adding item:', error);
                alert('Error adding recipe:' + error.message);
            });
        }
    
        return (
            <div style={{ backgroundColor: '#FFF7F1', minHeight: '80vh' }}>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3"
                    style={{ backgroundColor: '#FFE4C9!important', width: '100%', position: 'fixed', top: '0', zIndex: '1000', paddingLeft: '15px', paddingRight: '15px' }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active ms-4" aria-current="page" to="/getcatalog"
                                        style={{ color: '#000033' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/postcatalog" style={{ color: '#000033' }}>Add Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/putcatalog" style={{ color: '#000033' }}>Modify Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/deletecatalog" style={{ color: '#000033' }}>Delete Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/studentinfoview" style={{ color: '#000033' }}>Team Members</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                {/* Form fields */}
                <div style={{ backgroundColor: '#FFF7F1!important'}} className="container mt-5">
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: '200px'}}>
                        </div>
                        <div style={{background: '#FFE4C9'}} className="mb-3">
                            <input  style={{background: '#FFE4C9'}} type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} placeholder="Recipe name" required />
                        </div>
                        <div className="mb-3">
                            <input style={{background: '#FFE4C9'}} type="text" className="form-control" name="url" value={formData.url} onChange={handleChange} placeholder="Image URL" required />
                        </div>
                        <div className="mb-3">
                            <input style={{background: '#FFE4C9'}} className="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Recipe description" required/>
                        </div>
                        <div className="mb-3">
                            <input style={{background: '#FFE4C9'}} className="form-control" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Recipe ingredients" required />
                        </div>
                        <div className="mb-3">
                            <input style={{background: '#FFE4C9'}} className="form-control" name="directions" value={formData.directions} onChange={handleChange} placeholder="Recipe directions" required  />
                        </div>
                        <div className="mb-3 d-flex justify-content-center">
                            <button type="submit" style={{marginRight: '10px', marginBottom: '30px', marginTop: '30px', borderRadius: '20px', width: '120px', height: '40px' ,background: '#E78895', color: 'white' }}className="btn btn-primary">Post a recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const Deletecatalog = () => {
        const [recipes, setRecipes] = useState([]);
        const [index, setIndex] = useState(0);
        const navigate = useNavigate();
    
        useEffect(() => {
            fetch("http://localhost:8081/listRecipes")
                .then((response) => response.json())
                .then((data) => {
                    setRecipes(data);
                    console.log("Load initial Catalog of Recipes in DELETE :", data);
                });
        }, []);
    
        function getOneByOneRecipeNext() {
            if (recipes.length > 0) {
                if (index === recipes.length - 1) setIndex(0);
                else setIndex(index + 1);
            }
        }
    
        function getOneByOneRecipePrev() {
            if (recipes.length > 0) {
                if (index === 0) setIndex(recipes.length - 1);
                else setIndex(index - 1);
            }
        }
    
        const deleteOneRecipe = (recipeId) => {
            console.log("Recipe to delete :", recipeId);
            fetch("http://localhost:8081/deleteRecipe/" + recipeId, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "recipeId": recipeId }),
            })
                .then(response => {
                    if (response.status !== 200) {
                        return response.json()
                            .then(errData => {
                                throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                            })
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Delete a recipe completed : ", recipeId);
                    console.log(data);
                    const newRecipes = recipes.filter(recipe => recipe.recipeId !== recipeId);
                    setRecipes(newRecipes);
                    setIndex(0);
                    if (data) {
                        const key = Object.keys(data);
                        const value = Object.values(data);
                        alert(key + value);
                    }
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                    alert('Error deleting recipe:' + error.message);
                });
        }
    
        return (
            <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-custom navbar-expand-lg navbar-light bg-light rounded-3">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active ms-4" aria-current="page" to="/getcatalog"
                                        style={{ color: '#000033' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/postcatalog" style={{ color: '#000033' }}>Add Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/putcatalog" style={{ color: '#000033' }}>Modify Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/deletecatalog" style={{ color: '#000033' }}>Delete Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link ms-4" to="/studentinfoview" style={{ color: '#000033' }}>Team Members</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div style={{ paddingTop: '40px' }}>
                <h3 style={{ textAlign: 'center', marginTop: '40px' }}>Delete one recipe:</h3>
                <div style={{ margin: '50px', textAlign: 'center' }}>
                    <button style={{ marginRight: '10px', borderRadius: '20px', backgroundColor: '#E78895', color: 'white', width: '120px', height: '40px' }} onClick={() => getOneByOneRecipePrev()}>Prev</button>
                    <button style={{ marginRight: '10px', borderRadius: '20px', backgroundColor: '#E78895', color: 'white', width: '120px', height: '40px' }} onClick={() => getOneByOneRecipeNext()}>Next</button>
                </div>
    
                <div style={{ paddingTop: '0px' }}> 
                    <div className="container mt-4">
                        <div className="row">
                            {recipes[index] && (
                                <div className="card-pinktan-box" style={{ maxWidth: '700px', margin: '0 auto' }}>
                                    <img  height="450" src={recipes[index].url} className="card-img-top" alt="recipe" />
                                    <div className="card-body">
                                        <h1 className="card-title" style={{ color: 'bla' }}>{recipes[index].title}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                 
                <div style={{ margin: '50px', textAlign: 'center' }}>
                    <button style={{ borderRadius: '20px', backgroundColor: '#E78895', color: 'white', width: '120px', height: '40px' }} onClick={() => deleteOneRecipe(recipes[index]?.recipeId)}>Delete</button>
                </div>
                

            </div>
            </div>
        );
    }
    

    const Putcatalog = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            recipeId: '',
            title: '',
            url: '',
            description: '',
            ingredients: '',
            directions: '',
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            fetch(`http://localhost:8081/updateRecipe/${formData.recipeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (response.status !== 200) {
                        return response.json()
                            .then(errData => {
                                throw new Error(`PUT response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                            })
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    alert("Item updated successfully!");
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                    alert('Error updating recipe:' + error.message);
                });
        }

        return (
            <div>
                <button className="btn btn-primary rounded-pill" onClick={() => navigate('/getcatalog')}>Catalog</button>
                    <button className="btn btn-secondary rounded-pill" onClick={() => navigate('/getcatalogid')}>Item by Id</button>
                    <button className="btn btn-success rounded-pill" onClick={() => navigate('/postcatalog')}>Add Item</button>
                    <button className="btn btn-warning rounded-pill" onClick={() => navigate('/putcatalog')}>Modify Item</button>
                    <button className="btn btn-danger rounded-pill" onClick={() => navigate('/deletecatalog')}>Delete Item</button>
                    <button className="btn btn-white rounded-pill" onClick={() => navigate('/StudentInfoView')}>Team Members</button>
                

                <form onSubmit={handleSubmit}>
                    <h1>Edit a Recipe</h1>
                    <input type="text" name="recipeId" value={formData.recipeId} onChange={handleChange} placeholder="Recipe ID" required /> <br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /> <br />
                    <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" required /> <br />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /> <br />
                    <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required /> <br />
                    <input type="text" name="directions" value={formData.directions} onChange={handleChange} placeholder="Directions" required /> <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

   
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Getcatalog />} />
                <Route path="/getcatalog" element={<Getcatalog />} />
                <Route path="/" element={<Getcatalog />} />
                <Route path="/getcatalog" element={<Getcatalog />} />
                <Route path="/getcatalogid/:id" element={<GetcatalogidComponent />} />
                <Route path="/postcatalog" element={<Postcatalog />} />
                <Route path="/putcatalog" element={<Putcatalog />} />
                <Route path="/deletecatalog" element={<Deletecatalog />} />
                <Route path="/studentinfoview" element={<StudentInfoView />} />
            </Routes>
        </Router>
    );
}

export default App;