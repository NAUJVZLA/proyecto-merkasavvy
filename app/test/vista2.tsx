import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircle, ShoppingCart, Trash, Edit, Save, DollarSign } from "lucide-react"
import BudgetModal from './vista2.2'

interface ShoppingItem {
    id: string
    name: string
    quantity: number
    checked: boolean
}

interface ShoppingList {
    id: string
    name: string
    items: ShoppingItem[]
    budget?: number
}

export default function ShoppingListModal() {
    const [lists, setLists] = useState<ShoppingList[]>([
        { id: '1', name: 'Groceries', items: [{ id: '1', name: 'Apples', quantity: 5, checked: false }] },
        { id: '2', name: 'Hardware', items: [{ id: '1', name: 'Screws', quantity: 20, checked: true }] },
    ])
    const [selectedList, setSelectedList] = useState<ShoppingList | null>(null)
    const [newListName, setNewListName] = useState('')
    const [newItemName, setNewItemName] = useState('')
    const [newItemQuantity, setNewItemQuantity] = useState('')
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null)
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
    const [userBudget, setUserBudget] = useState<number | null>(null)

    const createNewList = () => {
        if (newListName.trim() === '') return
        const newList: ShoppingList = {
            id: Date.now().toString(),
            name: newListName,
            items: []
        }
        setLists([...lists, newList])
        setNewListName('')
    }

    const deleteList = (listId: string) => {
        setLists(lists.filter(list => list.id !== listId))
        setSelectedList(null)
    }

    const addItemToList = () => {
        if (newItemName.trim() === '' || newItemQuantity.trim() === '' || !selectedList) return
        const newItem: ShoppingItem = {
            id: Date.now().toString(),
            name: newItemName,
            quantity: parseInt(newItemQuantity),
            checked: false
        }
        const updatedList = {
            ...selectedList,
            items: [...selectedList.items, newItem]
        }
        setLists(lists.map(list => list.id === selectedList.id ? updatedList : list))
        setSelectedList(updatedList)
        setNewItemName('')
        setNewItemQuantity('')
    }

    const toggleItemCheck = (itemId: string) => {
        if (!selectedList) return
        const updatedItems = selectedList.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
        )
        const updatedList = { ...selectedList, items: updatedItems }
        setLists(lists.map(list => list.id === selectedList.id ? updatedList : list))
        setSelectedList(updatedList)
    }

    const startEditingItem = (item: ShoppingItem) => {
        setEditingItem(item)
    }

    const saveEditingItem = () => {
        if (!selectedList || !editingItem) return
        const updatedItems = selectedList.items.map(item =>
            item.id === editingItem.id ? editingItem : item
        )
        const updatedList = { ...selectedList, items: updatedItems }
        setLists(lists.map(list => list.id === selectedList.id ? updatedList : list))
        setSelectedList(updatedList)
        setEditingItem(null)
    }

    const openBudgetModal = () => {
        setIsBudgetModalOpen(true)
    }

    const closeBudgetModal = () => {
        setIsBudgetModalOpen(false)
    }

    const setBudget = () => {
        if (!selectedList || userBudget === null) return
        const updatedList = { ...selectedList, budget: userBudget }
        setLists(lists.map(list => list.id === selectedList.id ? updatedList : list))
        setSelectedList(updatedList)
        setUserBudget(null)
    }

    const calculateTotal = (list: ShoppingList) => {
        return list.items.reduce((total, item) => total + item.quantity, 0)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <ShoppingCart className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Shopping Lists</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {selectedList ? (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">{selectedList.name}</h3>
                                <Button variant="destructive" size="sm" onClick={() => deleteList(selectedList.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {selectedList.budget && (
                                <div className="mb-4">
                                    <p>Budget: ${selectedList.budget}</p>
                                    <p>Total items: {calculateTotal(selectedList)}</p>
                                    <p className={calculateTotal(selectedList) > selectedList.budget ? "text-red-500" : "text-green-500"}>
                                        {calculateTotal(selectedList) > selectedList.budget ? "Over budget" : "Within budget"}
                                    </p>
                                </div>
                            )}
                            <ul className="space-y-2">
                                {selectedList.items.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between">
                                        {editingItem && editingItem.id === item.id ? (
                                            <>
                                                <Input
                                                    value={editingItem.name}
                                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                                    className="w-1/2"
                                                />
                                                <Input
                                                    type="number"
                                                    value={editingItem.quantity}
                                                    onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                                                    className="w-1/4"
                                                />
                                                <Button size="sm" onClick={saveEditingItem}>
                                                    <Save className="h-4 w-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{item.name} (x{item.quantity})</span>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => toggleItemCheck(item.id)}
                                                    />
                                                    <Button size="sm" onClick={() => startEditingItem(item)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center space-x-2 mt-4">
                                <Input
                                    placeholder="New item name"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Quantity"
                                    value={newItemQuantity}
                                    onChange={(e) => setNewItemQuantity(e.target.value)}
                                />
                                <Button onClick={addItemToList}>Add</Button>
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                                <Input
                                    type="number"
                                    placeholder="Set budget"
                                    value={userBudget !== null ? userBudget : ''}
                                    onChange={(e) => setUserBudget(parseFloat(e.target.value))}
                                />
                                <Button onClick={setBudget}>
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Set Budget
                                </Button>
                            </div>
                            <Button onClick={openBudgetModal} className="mt-4">
                                Open Budget View
                            </Button>
                            <Button onClick={() => setSelectedList(null)} className="mt-4">Back to Lists</Button>
                        </div>
                    ) : (
                        <>
                            <ul className="space-y-2">
                                {lists.map((list) => (
                                    <li key={list.id} className="flex items-center justify-between">
                                        <span>{list.name}</span>
                                        <Button onClick={() => setSelectedList(list)}>View</Button>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="New list name"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                />
                                <Button onClick={createNewList} disabled={newListName.trim() === ''}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
            <BudgetModal isOpen={isBudgetModalOpen} onClose={closeBudgetModal} />
        </Dialog>
    )
}