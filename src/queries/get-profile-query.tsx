'use client';

import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
// import { userService } from '@/services';
import { Profile, useSessionStore } from '@/stores/session-store';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileQuery = () => {
    const { token } = useFirebaseAuth();
    const { updateProfile } = useSessionStore();

    return useQuery({
        queryKey: ['getProfileQuery', token],
        enabled: token !== null,
        queryFn: async () => {
            // const profile = await userService.getProfile();
            const profile: Profile = {
                id: '1',
                name: 'Matheus Vieira',
                email: 'iZd8o@example.com',
            }
            updateProfile(profile);
            return profile;
        },
        refetchOnWindowFocus: false,
    });
};
