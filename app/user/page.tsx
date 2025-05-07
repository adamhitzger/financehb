import UserComp from '@/components/userComp';
import { getCurrentUser } from '@/database/currentUser';
import { turso } from '@/database/client';
export default async function UserPage() {
    const user = await getCurrentUser({withFullUser: true});
    let data;
    if(user){
    const result = await turso.execute({
        sql: `
          SELECT status
          FROM subscriptions
          WHERE user_id = ?
          LIMIT 1
        `,
        args: [user.id]
      });
      
      data = result.rows[0];
      console.log(data);
    }
    console.log(user?.raynet_id)

    return (    
        <UserComp user={user} status={data?.status as string}/>
    )
}

