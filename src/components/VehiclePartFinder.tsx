import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const VehiclePartFinder = () => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const makes = ["Toyota", "Honda", "BMW", "Mercedes", "Audi", "Ford", "Chevrolet", "Nissan"];
  const models = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Truck"];
  const years = Array.from({ length: 25 }, (_, i) => (2024 - i).toString());

  const handleSearch = () => {
    if (!selectedMake || !selectedModel || !selectedYear) {
      toast({
        title: "Please complete your selection",
        description: "Select make, model, and year to search for parts",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Searching for parts",
      description: `Finding parts for ${selectedYear} ${selectedMake} ${selectedModel}`,
    });
  };
  return (
    <section className="bg-surface py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Find the Perfect Parts for Your Vehicle
          </h2>
          
          <div className="card-automotive p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Make Selector */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Make
                </label>
                <Select>
                  <SelectTrigger className="bg-input border-input-border">
                    <SelectValue placeholder="Choose Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="ferrari">Ferrari</SelectItem>
                    <SelectItem value="lamborghini">Lamborghini</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Model
                </label>
                <Select>
                  <SelectTrigger className="bg-input border-input-border">
                    <SelectValue placeholder="Choose Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="a6">A6</SelectItem>
                    <SelectItem value="q7">Q7</SelectItem>
                    <SelectItem value="r8">R8</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year Selector */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Year
                </label>
                <Select>
                  <SelectTrigger className="bg-input border-input-border">
                    <SelectValue placeholder="Choose Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div>
                <Button className="btn-racing w-full">
                  Search Parts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehiclePartFinder;