import { ChangeEvent, useEffect, useState } from "react";
import { menuItems as menuItemsApi } from "../config/apis/MenuItems";
import { generateAPI, generateMultipartAPI } from "../config/ApiGenerate";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditItem() {
    const [formData, setFormData] = useState({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        price: "",
        image: "",
        customizations: [
            {
                name: { en: "", ar: "" },
                variants: [{ name: { en: "", ar: "" }, price: "" }],
            },
        ],
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('')

    const { index } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchItemByIndex() {
            try {
                const api = { ...menuItemsApi.getItemByIndex };
                api.url = api.url + index!;
                const response = await generateAPI(api);

                const item = response?.data.selectedItem
                if (item) {
                    // Update the state with the fetched data
                    setFormData({
                        name_en: item.name.en,
                        name_ar: item.name.ar,
                        description_en: item.description.en,
                        description_ar: item.description.ar,
                        price: item.price,
                        image: item.image,
                        customizations: item.customization
                            ? item.customization.map((customization: any) => ({
                                name: {
                                    en: customization.name.en,
                                    ar: customization.name.ar,
                                },
                                variants: customization.variants.map((variant: any) => ({
                                    name: {
                                        en: variant.name.en,
                                        ar: variant.name.ar,
                                    },
                                    price: variant.price,
                                })),
                            }))
                            : [],
                    });
                    setPreviewUrl(item.image)
                }

            } catch (error) {
                // Handle error
                console.log('Unable to get item by index:', error);
            }
        }

        fetchItemByIndex();
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    // Handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files[0])
            setSelectedFile(e.target.files[0]);
        }
    };
    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    })

    const handleAddCustomization = () => {
        const newCustomization = {
            name: { en: "", ar: "" },
            variants: [{ name: { en: "", ar: "" }, price: "" }],
        };

        setFormData((prevState) => ({
            ...prevState,
            customizations: [...prevState.customizations, newCustomization],
        }));
    };

    const handleCustomizationInputChange = (customizationIndex: number, field: string, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex] as any)['name'][field] = value;

            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };

    const handleRemoveCustomization = (index: number) => {
        const updatedCustomizations = [...formData.customizations];
        updatedCustomizations.splice(index, 1);

        setFormData((prevState) => ({
            ...prevState,
            customizations: updatedCustomizations,
        }));
    };

    const handleVariantPriceChange = (customizationIndex: number, variantIndex: number, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex].variants[variantIndex] as any)['price'] = value;
            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };
    const handleVariantInputChange = (customizationIndex: number, variantIndex: number, field: string, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex].variants[variantIndex] as any)['name'][field] = value;
            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };

    // Function to handle item update
    const handleUpdateItem = async () => {
        try {

            const formDataToSend = new FormData();
            // Append form data to FormData object
            formDataToSend.append("index", index!)
            formDataToSend.append("name_en", formData.name_en);
            formDataToSend.append("name_ar", formData.name_ar);
            formDataToSend.append("description_en", formData.description_en);
            formDataToSend.append("description_ar", formData.description_ar);
            formDataToSend.append("price", formData.price);

            // Append image file if selected
            if (selectedFile) {
                formDataToSend.append("image", selectedFile);
            }

            // Append customizations to FormData object
            formData.customizations.forEach((customization, index) => {
                formDataToSend.append(`customization_name_en_${index}`, customization.name.en);
                formDataToSend.append(`customization_name_ar_${index}`, customization.name.ar);

                customization.variants.forEach((variant, variantIndex) => {
                    formDataToSend.append(`variant_name_en_${index}_${variantIndex}`, variant.name.en);
                    formDataToSend.append(`variant_name_ar_${index}_${variantIndex}`, variant.name.ar);
                    formDataToSend.append(`variant_price_${index}_${variantIndex}`, variant.price);
                });
            });


            // Make the API call to update the item
            const api = { ...menuItemsApi.updateItem }; // Assuming you have an updateItem API endpoint
            api.data = formDataToSend;
            const response = await generateMultipartAPI(api);
            alert('Item updated')
            navigate('/manage-items')
        } catch (error) {
            // Handle error
            alert('Error updating item:');
        }
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Name English</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Name Arabic</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="name_ar"
                            value={formData.name_ar}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description English</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description Arabic</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="description_ar"
                            value={formData.description_ar}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Price</label>
                    </td>
                    <td>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Image</label>
                    </td>
                    <td>
                        <input type="file" name="image" onChange={handleImageChange} />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><img src={previewUrl} /></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleAddCustomization} className="btn-purple">
                            Add Customization
                        </button>
                    </td>
                </tr>
                {/* Render customization input fields */}
                {formData.customizations.map((customization, index) => (
                    <React.Fragment key={`customizations_` + index}>
                        <tr key={`customization_` + index}>
                            <td>
                                <h1>Customization{` ` + (index + 1)}</h1>
                            </td>
                        </tr>
                        <tr key={`customization_name_en_` + index}>
                            <td>
                                <label>Customization Name English</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={customization.name.en}
                                    onChange={(e) => { handleCustomizationInputChange(index, 'en', e.target.value) }}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-red"
                                    onClick={() => handleRemoveCustomization(index)}
                                >
                                    Remove Customization{` ` + (index + 1)}
                                </button>
                            </td>
                        </tr>
                        <tr key={`customization_name_ar_` + index}>
                            <td>
                                <label>Customization Name Arabic</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={customization.name.ar}
                                    onChange={(e) => { handleCustomizationInputChange(index, 'ar', e.target.value) }}
                                />
                            </td>
                        </tr>
                        {customization.variants.map((variant, variantIndex) => (
                            <React.Fragment key={`variants_` + index}>
                                <tr key={`variant_name_en_` + variantIndex}>
                                    <td>
                                        <label>Variant Name English</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={variant.name.en}
                                            onChange={(e) => { handleVariantInputChange(index, variantIndex, 'en', e.target.value) }}
                                        />
                                    </td>
                                </tr>
                                <tr key={`variant_name_ar_` + variantIndex}>
                                    <td>
                                        <label>Variant Name Arabic</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={variant.name.ar}
                                            onChange={(e) => { handleVariantInputChange(index, variantIndex, 'ar', e.target.value) }}
                                        />
                                    </td>
                                </tr>
                                <tr key={`variant_price_` + variantIndex}>
                                    <td>
                                        <label>Variant Price</label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name={`variant_price_` + { index }}
                                            value={variant.price}
                                            onChange={(e) => { handleVariantPriceChange(index, variantIndex, e.target.value) }}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
                <tr>
                    <td></td>
                    <td>
                        <button className="btn btn-blue" onClick={handleUpdateItem}>
                            Submit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
