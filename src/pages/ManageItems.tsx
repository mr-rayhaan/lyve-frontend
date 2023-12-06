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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Change as needed
    const [totalItems, setTotalItems] = useState<number>(0);

    const tableItems: any = menuItems?.map((item: MenuItem, index: number) => {
        return (
            <tr key={index} className="row-item" >
                <td onClick={() => navigate('/item-details', { state: item })}>{item.name?.en}</td>
                <td onClick={() => navigate('/item-details', { state: item })}>{item.description?.en}</td>
                <td onClick={() => navigate('/item-details', { state: item })}>{item.price}</td>
                <td onClick={() => navigate('/item-details', { state: item })}><img src={item.image} /></td>
                <td><i className="fa fa-edit action-icon" onClick={() => navigate(`/edit-item/${calculateAdjustedIndex(index)}`)}></i></td>
                <td>
                    <i className="fa fa-trash-o action-icon" onClick={() => toggleDeleteConfirmation(index, true)}></i>
                </td>
            </tr>

        )
    })
    function calculateAdjustedIndex(selectedIndex: number) {
        return ((currentPage - 1) * itemsPerPage + selectedIndex).toString();
    }
    const deleteItem = async (index: number) => {
        // e.preventDefault();
        try {
            // Make an API call to delete the item by index
            const deleteApi = menuItemsApi.deleteMenuItemByIndex;
            const formData = new FormData()
            formData.append('index', calculateAdjustedIndex(index))
            deleteApi.data = formData
            await generateAPI(deleteApi);

            // Update the state to reflect the deleted item
            setMenuItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems.splice(index, 1);
                return updatedItems;
            });
            alert('Item deleted')
        } catch (error) {
            // Handle error
            alert('Unable to delete menu item');
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
                api.params = {
                    page: currentPage,
                    limit: itemsPerPage,
                };
                var response: any = await generateAPI(api)

                // setMenuItems(() => response.data);
                setMenuItems(response.data.data);
                setTotalItems(response.data.totalItems);

            } catch (error) {
                // Handle error
                console.log('unable to get cloths: ', error)
            }
        }

        fetchMenuItems();
    }, [currentPage]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);
    // Add pagination component (e.g., page numbers or next/prev buttons)
    const renderPagination = () => {
        const pageNumbers = []; console.log(totalItems, "::", itemsPerPage)
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {

            pageNumbers.push(
                <li key={i} onClick={() => setCurrentPage(i)} className={`pagination-list-item ` + `pagination-list-item ${currentPage === i ? 'font-bold' : ''}`}>
                    {i}
                </li>
            );
        }

        return (
            <ul style={{ display: 'inline-block', listStyle: 'none', padding: 0 }}>
                {pageNumbers}
            </ul>);
    };


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
            <div className="text-center mt-[20px]">
                {renderPagination()}
            </div>
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