import { getUser } from '@/auth/server';

import { createSupabaseClient } from '@/auth/server';
import UserComp from '@/components/userComp';

export default async function UserPage() {
    const client = await createSupabaseClient();
    const user = await getUser();
    
    const { data, error } = await client.from("subscriptions").select("status").eq("user_id", user?.id).single();
    console.log(data)
    if(error) console.log(error.message)
    console.log(user?.raynet_id)

    return (    
        <UserComp user={user} status={data?.status}/>
    )
}

