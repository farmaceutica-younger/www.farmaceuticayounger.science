import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface MapProps {
  companies: Company[];
}

const Map = ({ companies }: MapProps) => {
  return (
    <div>
      <MapContainer
        style={{
          height: 500,
          zIndex: 1,
        }}
        center={computeCenter(companies)}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {companies.map((a) => (
          <Marker key={a.id} position={[a.latitude, a.longitude]}>
            <Popup>
              <p className="font-bold">{a.companyName}</p>
              <p>{a.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

type Company = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  public: boolean;
  companyName: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  region: string;
  city: string;
  province: string;
};

function computeCenter(company: Company[]): [number, number] {
  const lat = average(company.map((a) => a.latitude));
  const lng = average(company.map((a) => a.longitude));
  return [lat, lng];
}

function average(nums: number[]) {
  return nums.reduce((a, b) => a + b) / nums.length;
}
