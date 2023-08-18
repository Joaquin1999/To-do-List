import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import {useState,useEffect} from 'react';
import AddItems from "./AddItems";
import SearchItem from "./SearchItem";
import apiRequest from './apiRequest';

function App() {
   
  const API_URL='http://localhost:3500/items';

  const[items, setItems]=useState([]);
const [newItem, setNewItem] =useState('')
const [search, setSearch]=useState('')
const [fetchError,setfetchError]=useState(null)
const [isLoading,setIsLoading]=useState(true)

useEffect(()=> {

  const fetchItems = async ()=>  {
        
    
    try{
         
      const response =await fetch(API_URL);

      if (!response.ok) throw Error('Did not receive expected data');
      const listItems = await response.json();
      
      console.log(listItems);
      setItems(listItems);
  
    }catch(err){
      
    setfetchError(err.message);
    
    }
    finally{
      setIsLoading(false);
    }
    
  }

  setTimeout(() => fetchItems(), 2000);
 
},[])

const addItem = async(item) => {
      
        const id=items.length? items[items.length -1].id +1 : 1;
        const addNewItem={id,checked:false,item}
        const listitems=[...items,addNewItem];
        setItems(listitems);

        
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setfetchError(result);

       
}

const handlechange = async(id) => {
 const listitems= items.map((item)=>item.id===id ? {...item,checked:!item.checked} :item)
    
    setItems(listitems)
    
    const myItem = listitems.filter((item) => item.id === id);
    const updateOptions = {
         method: 'PATCH',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: myItem[0].checked })
       };

    const reqUrl=`${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setfetchError(result);
  
    // const myItem = listitems.filter((item) => item.id === id);
    // const updateOptions = {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ checked: myItem[0].checked })
    // };
    // const reqUrl = `${API_URL}/${id}`;
    // const result = await apiRequest(reqUrl, updateOptions);
    // if (result) setfetchError(result);
      
    
}

const handleDelete=async(id)=>{
  
  const listitems= items.filter((item)=>item.id!==id)
    setItems(listitems)
    
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setfetchError(result);
    
    

}

const handleSubmit =(e)=>{  


  e.preventDefault();
  console.log("submitted");
  if(!newItem) return;
  console.log(newItem);
  addItem(newItem)
  setNewItem('');


}

  return (
  

    <div className="App">
      <Header   />

      <AddItems
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />

      <SearchItem
      search={search}
      setSearch={setSearch}
      />

      
       
        
        <main>

        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p >{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
       
      items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handlechange={handlechange}
      handleDelete={handleDelete}
      
      
      />}
      </main>
      
      
      
      <Footer 
      // prop drilling
      length={items.length}
      
      />
    </div>
      );
}

export default App;
