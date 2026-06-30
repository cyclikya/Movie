import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from './auth.slice';

export const useAuthUser = () => useAppSelector(selectUser);