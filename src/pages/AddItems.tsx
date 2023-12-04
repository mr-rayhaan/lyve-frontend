import { ChangeEvent, useState } from "react";
import { menuItems } from "../config/apis/MenuItems";
import { generateMultipartAPI } from "../config/ApiGenerate";
import axios from "axios";
import React from "react";
interface Name {
    en: string;
    ar: string;
}

interface Variant {
    name: Name;
    price: number;
}

interface Customization {
    name: Name;
    variants: Variant[];
}

export default function AddItems() {
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: '',
        price: '',
        customization_name_en: '',
        customization_name_ar: '',
        variant_name_en: '',
        variant_name_ar: '',
        variant_price: '',
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const [customizations, setCustomizations] = useState<Customization[]>([]);

    const handleAddCustomization = () => {
        const newCustomization: Customization = {
            name: { en: "", ar: "" },
            variants: [{ name: { en: "", ar: "" }, price: 0 }],
        };

        setCustomizations([...customizations, newCustomization]);
    };
    const handleRemoveCustomization = (index: number) => {
        const updatedCustomizations = [...customizations];
        updatedCustomizations.splice(index, 1);
        setCustomizations(updatedCustomizations);
    };

    const handleAddItem = async () => {
        const price = parseFloat(formData.price);
        const variantPrice = parseFloat(formData.variant_price);

        // Validation
        if (Object.values(formData).some((field) => !field) ||
            isNaN(price) ||
            price < 0 ||
            isNaN(variantPrice) ||
            variantPrice < 0) {
            alert('Please fill in all fields and ensure that the price is not negative.');
            return;
        }
        const addItemApi = menuItems.addMenuItem;
        // Create a FormData object
        const formDataToSend = new FormData();

        formDataToSend.append('name_en', formData.name_en);
        formDataToSend.append('name_ar', formData.name_ar);
        formDataToSend.append('description_en', formData.description_en);
        formDataToSend.append('description_ar', formData.description_ar);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('customization_name_en', formData.customization_name_en);
        formDataToSend.append('customization_name_ar', formData.customization_name_ar);
        formDataToSend.append('variant_name_en', formData.variant_name_en);
        formDataToSend.append('variant_name_ar', formData.variant_name_ar);
        formDataToSend.append('variant_price', formData.variant_price);

        // Append the image file to the FormData object
        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }

        addItemApi.data = formDataToSend;
        // console.log('api', addItemApi)

        try {
            const response = await generateMultipartAPI(addItemApi);
            // alert(response?.data.message)
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td><label>Name English</label></td>
                    <td><input type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Name Arabic</label></td>
                    <td><input type="text" name="name_ar" value={formData.name_ar} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Description English</label></td>
                    <td><input type="text" name="description_en" value={formData.description_en} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Description Arabic</label></td>
                    <td><input type="text" name="description_ar" value={formData.description_ar} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Price</label></td>
                    <td><input type="number" name="price" value={formData.price} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Image</label></td>
                    <td><input type="file" name="image" onChange={handleImageChange} /></td>
                </tr>
                <tr>
                    <button onClick={handleAddCustomization} className="btn-purple">Add Customization</button>
                </tr>
                {/* Render customization input fields */}
                {customizations.map((customization, index) => (
                    <React.Fragment key={`customizations_` + index}>
                        <tr key={`customization_` + index}><td><h1>Customization{` ` + (index + 1)}</h1></td></tr>
                        <tr key={`customization_name_en_` + index}>
                            <td><label>Customization Name English</label></td>
                            <td><input
                                type="text"
                                value={customization.name.en}
                                onChange={(e) =>
                                // handleInputChange(index, "name", "en", e.target.value)
                                { }}
                            />
                            </td>
                            <td><button className="btn-red" onClick={() => handleRemoveCustomization(index)}>Remove Customization{` ` + (index + 1)}</button></td>
                        </tr>
                        <tr key={`customization_name_ar_` + index}>
                            <td><label>Customization Name Arabic</label></td>
                            <td>
                                <input type="text" value={customization.name.ar}
                                    onChange={(e) => { }}
                                />
                            </td>
                        </tr>
                        {customization.variants.map((variant, variantIndex) => (
                            <React.Fragment key={`variants_` + index}>
                                <tr key={`variant_name_en_` + variantIndex}>
                                    <td><label>Variant Name English</label></td>
                                    <td><input
                                        type="text"
                                        value={variant.name.en}
                                        onChange={(e) =>
                                        // handleInputChange(
                                        //     index,
                                        //     "variants",
                                        //     "en",
                                        //     e.target.value
                                        // )
                                        { }}
                                    /></td>
                                </tr>
                                <tr key={`variant_name_ar_` + variantIndex}>
                                    <td><label>Variant Name Arabic</label></td>
                                    <td><input
                                        type="text"
                                        value={variant.name.ar}
                                        onChange={(e) =>
                                        // handleInputChange(
                                        //     index,
                                        //     "variants",
                                        //     "en",
                                        //     e.target.value
                                        // )
                                        { }}
                                    /></td>
                                </tr>
                                <tr key={`variant_price_` + variantIndex}>
                                    <td><label>Variant Price</label></td>
                                    <td>
                                        <input type="number" name={`variant_price_` + { index }}
                                            onChange={(e) => { }}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </React.Fragment >
                ))}
                {/* <tr>
                    <td><label>Customization Name English</label></td>
                    <td><input type="text" name="customization_name_en" value={formData.customization_name_en} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Customization Name Arabic</label></td>
                    <td><input type="text" name="customization_name_ar" value={formData.customization_name_ar} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Variant Name English</label></td>
                    <td><input type="text" name="variant_name_en" value={formData.variant_name_en} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Variant Name Arabic</label></td>
                    <td><input type="text" name="variant_name_ar" value={formData.variant_name_ar} onChange={handleInputChange} /></td>
                </tr>
                <tr>
                    <td><label>Variant Price</label></td>
                    <td><input type="number" name="variant_price" value={formData.variant_price} onChange={handleInputChange} /></td>
                </tr> */}
                <tr><td></td><td><button className="btn btn-blue" onClick={handleAddItem}>Submit</button></td></tr>
            </tbody>
        </table>
    );
}
