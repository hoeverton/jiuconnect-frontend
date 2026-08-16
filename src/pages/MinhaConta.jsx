import DashboardLayout from "../layouts/DashboardLayout";

import AccountHeader from "../components/account/AccountHeader";
import PersonalDataCard from "../components/account/PersonalDataCard";
import ProfileCard from "../components/account/ProfileCard";
import PhotoCard from "../components/account/PhotoCard";

export default function MinhaConta() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <AccountHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
              
            <PersonalDataCard />

          </div>

          <PhotoCard />

        </div>

        <ProfileCard />

      </div>

    </DashboardLayout>
  );
}