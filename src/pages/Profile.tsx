import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCurrentUser } from "@/hooks/use-api";
import { loadAccountDraft } from "@/lib/user-preferences";

const Profile = () => {
  const { data: user, isLoading } = useCurrentUser();
  const draft = loadAccountDraft();

  const profileName = draft.fullName?.trim() || user?.full_name || "Not set";
  const profileEmail = draft.email?.trim() || user?.email || "Not set";
  const profileStudentId = draft.studentId?.trim() || user?.student_id || "Not set";
  const profileUtorid =
    draft.utorid?.trim() || (profileEmail.includes("@") ? profileEmail.split("@")[0] : "Not set");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-[1080px] mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Profile</h1>
          {isLoading ? (
            <p className="text-muted-foreground">Loading profile...</p>
          ) : !user ? (
            <p className="text-muted-foreground">Sign in to view profile details.</p>
          ) : (
            <div className="border border-border rounded-sm bg-card p-6 space-y-3">
              <p><strong>Name:</strong> {profileName}</p>
              <p><strong>Email:</strong> {profileEmail}</p>
              <p><strong>Student ID:</strong> {profileStudentId}</p>
              <p><strong>UTORid:</strong> {profileUtorid}</p>

              <div className="pt-2">
                <Link
                  to="/settings#account"
                  className="inline-block bg-secondary text-secondary-foreground font-semibold px-6 py-2.5 rounded-sm text-sm hover:opacity-90 transition-opacity"
                >
                  Change account info
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
