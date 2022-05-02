import React,{useEffect,useState} from "react";
import { View,Text } from "react-native";
import axios  from "axios";


const App =()=>{
   const [data,setdata]=useState([]);
   useEffect(()=>{
         axios.get('http://localhost://3000/details')
         .then(()=>{
           res =>setdata(res.data)
         })
   },[])

  return(
      <View>
        {data.map(image=><View>
          <Text>{data.image}</Text>



        </View>)}
      </View>
      
      
      
  )

}

export default App;