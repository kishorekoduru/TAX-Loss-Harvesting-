
import { useEffect, useState } from "react";
import { fetchCapitalGains, fetchHoldings } from "@/services/api";
import { CapitalGains, Holding } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

const TaxLossHarvesting = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [afterHarvestGains, setAfterHarvestGains] = useState<CapitalGains | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
        setAfterHarvestGains(gainsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive"
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate gains for display
  const calculateNetGain = (profits: number, losses: number) => {
    return profits - losses;
  };

  const calculateRealizedGains = (gains: CapitalGains) => {
    if (!gains) return 0;
    const shortTerm = calculateNetGain(gains.stcg.profits, gains.stcg.losses);
    const longTerm = calculateNetGain(gains.ltcg.profits, gains.ltcg.losses);
    return shortTerm + longTerm;
  };

  const realizedGains = capitalGains ? calculateRealizedGains(capitalGains) : 0;
  const afterHarvestRealizedGains = afterHarvestGains ? calculateRealizedGains(afterHarvestGains) : 0;
  const savings = Math.max(0, realizedGains - afterHarvestRealizedGains);

  // Handle selection change
  const handleSelectHolding = (coin: string, isSelected: boolean) => {
    const newSelectedHoldings = new Set(selectedHoldings);
    
    if (isSelected) {
      newSelectedHoldings.add(coin);
    } else {
      newSelectedHoldings.delete(coin);
    }
    
    setSelectedHoldings(newSelectedHoldings);
    updateAfterHarvestGains(newSelectedHoldings);
  };

  const handleSelectAll = (isSelected: boolean) => {
    const newSelectedHoldings = new Set<string>();
    
    if (isSelected) {
      holdings.forEach(holding => {
        newSelectedHoldings.add(holding.coin);
      });
    }
    
    setSelectedHoldings(newSelectedHoldings);
    updateAfterHarvestGains(newSelectedHoldings);
  };

  // Update after harvest gains based on selected holdings
  const updateAfterHarvestGains = (selectedCoins: Set<string>) => {
    if (!capitalGains) return;

    // Start with the original capital gains
    const updatedGains = {
      stcg: { ...capitalGains.stcg },
      ltcg: { ...capitalGains.ltcg }
    };

    // Add gains from selected holdings
    holdings.forEach(holding => {
      const isSelected = selectedCoins.has(holding.coin);
      if (isSelected) {
        // Short-term gains
        if (holding.stcg.gain > 0) {
          updatedGains.stcg.profits += holding.stcg.gain;
        } else {
          updatedGains.stcg.losses += Math.abs(holding.stcg.gain);
        }

        // Long-term gains
        if (holding.ltcg.gain > 0) {
          updatedGains.ltcg.profits += holding.ltcg.gain;
        } else {
          updatedGains.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    setAfterHarvestGains(updatedGains);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format number with commas
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: value < 0.01 ? 8 : 2
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Tax Loss Harvesting</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pre-Harvesting Card */}
        <div className="bg-gray-900 text-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Pre-Harvesting</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Short-term</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Profits</p>
                  <p className="text-lg font-medium">{formatCurrency(capitalGains?.stcg.profits || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Losses</p>
                  <p className="text-lg font-medium">{formatCurrency(capitalGains?.stcg.losses || 0)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Net Capital Gains</p>
                <p className="text-lg font-medium">{formatCurrency(calculateNetGain(capitalGains?.stcg.profits || 0, capitalGains?.stcg.losses || 0))}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Long-term</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Profits</p>
                  <p className="text-lg font-medium">{formatCurrency(capitalGains?.ltcg.profits || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Losses</p>
                  <p className="text-lg font-medium">{formatCurrency(capitalGains?.ltcg.losses || 0)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Net Capital Gains</p>
                <p className="text-lg font-medium">{formatCurrency(calculateNetGain(capitalGains?.ltcg.profits || 0, capitalGains?.ltcg.losses || 0))}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 mb-1">Realised Capital Gains</p>
            <p className="text-2xl font-semibold">{formatCurrency(realizedGains)}</p>
          </div>
        </div>

        {/* After Harvesting Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">After Harvesting</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Short-term</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-200 mb-1">Profits</p>
                  <p className="text-lg font-medium">{formatCurrency(afterHarvestGains?.stcg.profits || 0)}</p>
                </div>
                <div>
                  <p className="text-blue-200 mb-1">Losses</p>
                  <p className="text-lg font-medium">{formatCurrency(afterHarvestGains?.stcg.losses || 0)}</p>
                </div>
              </div>
              <div>
                <p className="text-blue-200 mb-1">Net Capital Gains</p>
                <p className="text-lg font-medium">{formatCurrency(calculateNetGain(afterHarvestGains?.stcg.profits || 0, afterHarvestGains?.stcg.losses || 0))}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Long-term</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-200 mb-1">Profits</p>
                  <p className="text-lg font-medium">{formatCurrency(afterHarvestGains?.ltcg.profits || 0)}</p>
                </div>
                <div>
                  <p className="text-blue-200 mb-1">Losses</p>
                  <p className="text-lg font-medium">{formatCurrency(afterHarvestGains?.ltcg.losses || 0)}</p>
                </div>
              </div>
              <div>
                <p className="text-blue-200 mb-1">Net Capital Gains</p>
                <p className="text-lg font-medium">{formatCurrency(calculateNetGain(afterHarvestGains?.ltcg.profits || 0, afterHarvestGains?.ltcg.losses || 0))}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-500">
            <p className="text-blue-200 mb-1">Realised Capital Gains</p>
            <p className="text-2xl font-semibold">{formatCurrency(afterHarvestRealizedGains)}</p>
            
            {savings > 0 && (
              <div className="bg-green-500/20 text-green-100 p-3 rounded-md mt-4">
                <p className="font-medium">You're going to save {formatCurrency(savings)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Holdings ({holdings.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedHoldings.size === holdings.length && holdings.length > 0} 
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Holdings / Avg Buy Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Short-Term Gain</TableHead>
                <TableHead>Long-Term Gain</TableHead>
                <TableHead>Amount to Sell</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => {
                const isSelected = selectedHoldings.has(holding.coin);
                return (
                  <TableRow 
                    key={holding.coin}
                    className={isSelected ? "bg-primary/5" : ""}
                    onClick={() => handleSelectHolding(holding.coin, !isSelected)}
                  >
                    <TableCell className="w-12">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectHolding(holding.coin, checked as boolean)}
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={holding.logo} 
                          alt={holding.coin} 
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                          }}
                        />
                        <div>
                          <div className="font-medium">{holding.coin}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">{holding.coinName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatNumber(holding.totalHolding)}</div>
                        <div className="text-xs text-muted-foreground">{formatCurrency(holding.averageBuyPrice)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(holding.currentPrice)}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${holding.stcg.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(holding.stcg.gain)}
                      </div>
                      <div className="text-xs text-muted-foreground">{formatNumber(holding.stcg.balance)}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${holding.ltcg.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(holding.ltcg.gain)}
                      </div>
                      <div className="text-xs text-muted-foreground">{formatNumber(holding.ltcg.balance)}</div>
                    </TableCell>
                    <TableCell>
                      {isSelected ? (
                        <div className="font-medium">{formatNumber(holding.totalHolding)}</div>
                      ) : (
                        <div className="text-muted-foreground">-</div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxLossHarvesting;
