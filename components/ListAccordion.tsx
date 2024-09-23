"use client";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { List, Product } from "@/app/interface/createList-Produts";


interface ListAccordionProps {
    lists: List[];
    onDeleteList: (id: number) => void;
    onAddProduct: (listId: number) => void;
}

export default function ListAccordion({ lists, onDeleteList, onAddProduct }: ListAccordionProps) {
    const getTotalForList = (items: Product[]) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Listas Creadas</h3>
            <ul className="list-disc pl-5">
                {lists.map((list) => (
                    <li key={list.id} className="flex justify-between items-center">
                        <span>{list.name} - Total: ${getTotalForList(list.items)}</span>
                        <div>
                            <Button onClick={() => onAddProduct(list.id)} className="bg-yellow-400 hover:bg-yellow-500 mr-2">
                                Agregar Producto
                            </Button>
                            <Button onClick={() => onDeleteList(list.id)} variant="destructive">
                                Borrar
                            </Button>
                        </div>
                        <Accordion>
                            <AccordionItem>
                                <AccordionTrigger>Ver Productos</AccordionTrigger>
                                <AccordionContent>
                                    <ul>
                                        {list.items.map(product => (
                                            <li key={product.id}>
                                                {product.name} - Precio: ${product.price} - Cantidad: {product.quantity} - Medida: {product.measure} - Proveedor: {product.provider}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    );
}
