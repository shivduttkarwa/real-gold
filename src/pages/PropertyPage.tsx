import { useParams, Navigate } from "react-router-dom";
import PropDetail from "../components/reusable/PropDetails";
import { getPropertyById } from "../data/properties";
import DummyHero from "../components/DummyHero";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id ?? "");

  if (!property) return <Navigate to="/" replace />;

  return (
    <>
      <DummyHero />
      <PropDetail
        property={property}
        onContactSubmit={(data) => console.log("Contact:", data)}
        onSaveProperty={() => {}}
        onShareProperty={() => {}}
        onScheduleViewing={() => {}}
        onDownloadBrochure={() => {}}
      />
    </>
  );
}
