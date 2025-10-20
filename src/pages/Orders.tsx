import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Orders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Order History</h1>
          <p>Review your past purchases.</p>
        </div>

        <div className="card-automotive p-4 mt-2">
          <Table>
            <TableCaption>Your last 5 orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[{id:"A1001", date:"2025-10-02", status:"Shipped", total:"$1,299"},
                {id:"A1000", date:"2025-09-12", status:"Delivered", total:"$2,499"},
                {id:"A0999", date:"2025-08-22", status:"Delivered", total:"$899"}].map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell className="text-right">{o.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;


