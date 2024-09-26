import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface BudgetItem {
    id: number
    name: string
    price: number
    unit: string
    quantity: number
    provider: string
    included: boolean
}

export interface BudgetModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function BudgetModal({ isOpen, onClose }: BudgetModalProps) {
    const [baseListName, setBaseListName] = useState('')
    const [budget, setBudget] = useState('')
    const [items, setItems] = useState<BudgetItem[]>([
        { id: 1, name: 'Arroz', price: 2500, unit: 'Libra', quantity: 2, provider: 'D1', included: true },
        { id: 2, name: 'Frijol', price: 6000, unit: 'Libra', quantity: 1, provider: 'Exito', included: true },
        { id: 3, name: 'Azúcar', price: 3000, unit: 'Libra', quantity: 1, provider: 'Ara', included: true },
        { id: 4, name: 'Chocolate', price: 4500, unit: 'Libra', quantity: 1, provider: 'D1', included: true },
        { id: 5, name: 'Mantequilla', price: 8000, unit: 'Kilogramo', quantity: 0.5, provider: 'Proveedor E', included: false },
    ])

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = items
            .filter(item => item.included)
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotal(newTotal)
    }, [items])

    const toggleItemInclusion = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, included: !item.included } : item
        ))
    }

    const saveBaseList = () => {
        // Aquí iría la lógica para guardar la lista base
        console.log('Lista base guardada:', { baseListName, budget, items })
        onClose()
    }

    const deleteBaseList = () => {
        // Aquí iría la lógica para eliminar la lista base
        console.log('Lista base eliminada')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Presupuesto de Compra</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Nombre de la lista base"
                            value={baseListName}
                            onChange={(e) => setBaseListName(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Presupuesto"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Unidad de Medida</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Proveedor</TableHead>
                                <TableHead>Incluido</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.filter(item => item.included).map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.provider}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={item.included}
                                            onCheckedChange={() => toggleItemInclusion(item.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="text-right font-bold">
                        Total: {total}
                    </div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="not-included">
                            <AccordionTrigger>Productos no incluidos</AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Precio</TableHead>
                                            <TableHead>Unidad de Medida</TableHead>
                                            <TableHead>Cantidad</TableHead>
                                            <TableHead>Proveedor</TableHead>
                                            <TableHead>Incluir</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.filter(item => !item.included).map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.price}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{item.provider}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={item.included}
                                                        onCheckedChange={() => toggleItemInclusion(item.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex justify-between">
                        <Button onClick={saveBaseList} className="bg-green-500 hover:bg-green-600">
                            Guardar Lista Base
                        </Button>
                        <Button onClick={deleteBaseList} variant="destructive">
                            Eliminar Lista Base
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}