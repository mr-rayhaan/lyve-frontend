import { useEffect, useState } from "react"
import MenuItem from "../interface/MenuItem"
import { menuItems as menuItemsApi } from '../config/apis/MenuItems'
import { generateAPI } from "../config/ApiGenerate";
import { useNavigate } from "react-router-dom";

export default function ManageItems() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const navigate = useNavigate()
    const [itemToDeleteIndex, setItemToDeleteIndex] = useState<number>(-1)
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);


    const tableItems: any = menuItems?.map((item: MenuItem, index: number) => {
        // const serializedItem = encodeURIComponent(JSON.stringify(item));
        return (
            <tr key={index} className="row-item" >
                <td onClick={() => navigate('/item-details', { state: item })}>{item.name?.en}</td>
                <td onClick={() => navigate('/item-details', { state: item })}>{item.description?.en}</td>
                <td onClick={() => navigate('/item-details', { state: item })}>{item.price}</td>
                <td onClick={() => navigate('/item-details', { state: item })}><img src={item.image} /></td>
                <td><i className="fa fa-edit action-icon"></i></td>
                <td>
                    <i className="fa fa-trash-o action-icon" onClick={() => toggleDeleteConfirmation(index, true)}></i>
                </td>
            </tr>

        )
    })
    const deleteItem = async (index: number) => {
        // e.preventDefault();
        try {
            // Make an API call to delete the item by index
            const deleteApi = menuItemsApi.deleteMenuItemByIndex;
            const formData = new FormData()
            formData.append('index', index.toString())
            deleteApi.data = formData
            await generateAPI(deleteApi);

            // Update the state to reflect the deleted item
            setMenuItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems.splice(index, 1);
                return updatedItems;
            });
        } catch (error) {
            // Handle error
            console.log('Unable to delete menu item: ', error);
        }
    };
    const toggleDeleteConfirmation = (index: number, value: boolean) => {

        setDeleteConfirmationVisible(value);
        setItemToDeleteIndex(index)

    };
    const confirmDelete = () => {
        deleteItem(itemToDeleteIndex)
        toggleDeleteConfirmation(-1, false)
    }

    useEffect(() => {
        async function fetchMenuItems() {

            try {
                const api = menuItemsApi.getAllMenuItems
                var response: any = await generateAPI(api)

                setMenuItems(() => response.data);

            } catch (error) {
                // Handle error
                console.log('unable to get cloths: ', error)
            }
        }

        fetchMenuItems();
    }, []);


    if (!menuItems) {
        return <p>Loading</p>
    }
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Image</td>
                        <td>Action</td>
                    </tr>
                    {tableItems}
                </tbody>
            </table>
            {isDeleteConfirmationVisible && (
                <div>
                    <div className="overlayStyles" onClick={() => toggleDeleteConfirmation(-1, false)}></div>
                    <div className="dialogStyles">
                        <p>Are you sure you want to delete this item?</p>
                        <div className="h-4"></div>
                        <button className="btn btn-red" onClick={confirmDelete}>Yes</button>
                        <button className="btn btn-blue" onClick={() => toggleDeleteConfirmation(-1, false)}>No</button>
                    </div>
                </div>
            )}
        </>
    );
} 