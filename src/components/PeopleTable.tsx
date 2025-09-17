import type { Person } from '../types';

interface PeopleTableProps {
  people: Person[];
  onConvert: (id: string) => void;
}

export function PeopleTable({ people, onConvert }: PeopleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Point of Contact</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} className="text-center">
              <td className="py-2 px-4 border-b">{person.companyName}</td>
              <td className="py-2 px-4 border-b">{person.pointOfContact}</td>
              <td className="py-2 px-4 border-b">{person.phone}</td>
              <td className="py-2 px-4 border-b">{person.email}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  person.status === 'Lead' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'
                }`}>
                  {person.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                {person.status === 'Lead' && (
                  <button
                    onClick={() => onConvert(person.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Convert to Opportunity
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}