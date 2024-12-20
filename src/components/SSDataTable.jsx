import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SSDataTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const sampleProducts = [
        {
            id: 1,
            name: 'Apple iPhone 13',
            image: 'iphone13.jpg',
            price: 799,
            category: 'Smartphones',
            rating: 4.5,
            inventoryStatus: 'INSTOCK',
        },
        {
            id: 2,
            name: 'Samsung Galaxy S21',
            image: 'galaxy-s21.jpg',
            price: 999,
            category: 'Smartphones',
            rating: 4.3,
            inventoryStatus: 'INSTOCK',
        },
        {
            id: 3,
            name: 'Sony WH-1000XM4',
            image: 'sony-headphones.jpg',
            price: 349,
            category: 'Headphones',
            rating: 4.7,
            inventoryStatus: 'LOWSTOCK',
        },
        {
            id: 4,
            name: 'Dell XPS 13',
            image: 'dell-xps13.jpg',
            price: 1299,
            category: 'Laptops',
            rating: 4.8,
            inventoryStatus: 'INSTOCK',
        },
        {
            id: 5,
            name: 'Nintendo Switch',
            image: 'nintendo-switch.jpg',
            price: 299,
            category: 'Gaming Consoles',
            rating: 4.6,
            inventoryStatus: 'OUTOFSTOCK',
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProducts(sampleProducts);
            setLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };


    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
   
    if (loading) {
        return <ProgressSpinner style={{ width: '50px', height: '50px', left: '50%', top: '50%', position: 'relative' }} />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className=" mar-top">
            <DataTable className='SSDataTable' value={products} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name" />
                <Column field="price" header="Price" body={priceBodyTemplate} />
                <Column field="category" header="Category" />
                <Column header="Status" body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}
