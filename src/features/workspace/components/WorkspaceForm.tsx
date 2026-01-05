import { useState, useEffect } from "react";
import { MdArchive, MdDescription, MdFolderShared, MdMap, MdRocketLaunch } from "react-icons/md";
import { IconType } from "react-icons";
import { FormField } from "../../../components/ui/FormField";
import { Input } from "../../../components/ui/Input";
import { TextArea } from "../../../components/ui/TextArea";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";

interface WorkspaceFormData {
    title: string;
    type: 'Private' | 'Shared';
    description: string;
    icon: IconType;
    iconName: string;
    iconColor: string;
}

interface WorkspaceFormProps {
    initialData?: Partial<WorkspaceFormData>;
    onSubmit: (data: WorkspaceFormData) => void;
    onCancel: () => void;
}

const iconOptions = [
    { name: 'Rocket', component: MdRocketLaunch },
    { name: 'Description', component: MdDescription },
    { name: 'Map', component: MdMap },
    { name: 'Folder', component: MdFolderShared },
    { name: 'Archive', component: MdArchive }
];

export const colorOptions = ['indigo', 'emerald', 'orange', 'blue', 'gray', 'red', 'green', 'purple'];

export const WorkspaceForm = ({ initialData, onSubmit, onCancel }: WorkspaceFormProps) => {
    const [formData, setFormData] = useState<WorkspaceFormData>({
        title: initialData?.title || '',
        type: initialData?.type || 'Private',
        description: initialData?.description || '',
        icon: initialData?.icon || MdRocketLaunch,
        iconName: initialData?.iconName || 'MdRocketLaunch',
        iconColor: initialData?.iconColor || 'indigo'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                type: initialData.type || 'Private',
                description: initialData.description || '',
                icon: initialData.icon || MdRocketLaunch,
                iconName: initialData.iconName || 'MdRocketLaunch',
                iconColor: initialData.iconColor || 'indigo'
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Title" htmlFor="title">
                <Input
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </FormField>
            <FormField label="Type" htmlFor="type">
                <Select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Private' | 'Shared' })}
                >
                    <option value="Private">Private</option>
                    <option value="Shared">Shared</option>
                </Select>
            </FormField>
            <FormField label="Description" htmlFor="description">
                <TextArea
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                />
            </FormField>
            <FormField label="Icon" htmlFor="icon">
                <Select
                    id="icon"
                    value={iconOptions.find(opt => opt.component === formData.icon)?.name || 'Rocket'}
                    onChange={(e) => {
                        const selected = iconOptions.find(opt => opt.name === e.target.value);
                        if (selected) setFormData({ ...formData, icon: selected.component, iconName: selected.name });
                    }}
                >
                    {iconOptions.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                </Select>
            </FormField>
            <FormField label="Icon Color" htmlFor="iconColor">
                <Select
                    id="iconColor"
                    value={formData.iconColor}
                    onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                >
                    {colorOptions.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </Select>
            </FormField>
            <div className="flex gap-2 mt-4">
                <Button type="button" size="sm" variant="secondary" className="flex-1" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" size="sm" variant="primary" className="flex-1">
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
};