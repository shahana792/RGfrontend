import { useNavigate, useParams } from "react-router-dom";
import SearchResultRow from "./SearchResultRow";


const SearchResults = (props) => { // HOC - Higher Order Component


   
    let navigate = useNavigate();


    // 1. get housesArray from props
    // 2. get selected county name from params
    // 3. filter the houses array with the county selected
    // 4. iterate through the array using map and display the filtered houses


    let paramsObj = useParams();
    // console.log(paramsObj.county);
    let housesArray = props.housesData;
    let filteredHouses  = housesArray.filter((elem) => elem.county == paramsObj.county );
    console.log(filteredHouses);


    return (  
        <div className="row">
                <div
                    class="table-responsive"
                >
                    <table
                        class="table table-primary"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Address</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            filteredHouses.map((elem) => {
                                    return (
                                        <SearchResultRow house={elem}/>
                                    )
                                }
                            )
                        }
                                                     
                        </tbody>
                    </table>
                </div>
               


        </div>
    );
}
 
export default SearchResults;