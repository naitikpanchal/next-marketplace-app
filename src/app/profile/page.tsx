import Form from '@/app/profile/form';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
    return null;
  } else {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? '',
      },
    });

    if (!currentUser) {
      return <div>User not found</div>;
    }

    const handleUpdateProfile = () => {
      redirect('/profile/update');
    };
    return (
      <div>
        {session && (
          <div>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 relative">
                    <Image
                      src={currentUser?.image ?? ''}
                      alt="profile picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {Object.entries(currentUser).map(([key, value]) => {
                    if (value !== null && key !== 'id' && key !== 'password' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'image') {
                      return (
                        <div key={key} className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{String(value)}</dd>
                        </div>
                      );
                    }
                    return null;
                  })}
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}