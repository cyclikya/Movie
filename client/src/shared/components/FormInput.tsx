import { useController } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/shared/ui/input';

type FormInputProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    placeholder?: string;
    type?: string;
};

function FormInput<T extends FieldValues>({ name, control, placeholder, type }: FormInputProps<T>) {
    const { field, fieldState } = useController({ name, control });

    return (
        <div>
            <Input {...field} value={field.value ?? ''} type={type} placeholder={placeholder} />
            {fieldState.error && (
                <p className="mt-1 text-xs text-red-400">{fieldState.error.message}</p>
            )}
        </div>
    );
}

export default FormInput;