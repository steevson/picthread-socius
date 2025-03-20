import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { X, Camera, ImageIcon, ChevronLeft, Edit3, Smile } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AddStatus = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#000000');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDirectImageSelect = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setSelectedImage(`https://picsum.photos/200/300?random=${randomId}`);
  };

  const handleSubmit = () => {
    if (!selectedImage && !text) {
      toast({
        title: "Status is empty",
        description: "Please add an image or text to your status",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          toast({
            title: "Status added!",
            description: "Your status is now visible to your followers",
          });
          setIsLoading(false);
          navigate('/');
        }, 500);
      }
    }, 200);
  };

  const colorOptions = [
    '#000000', '#E53E3E', '#38A169', '#3182CE', 
    '#805AD5', '#D69E2E', '#DD6B20', '#718096'
  ];

  return (
    <Layout className="max-w-md mx-auto">
      <div className="relative h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">New Status</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSubmit}
            disabled={isLoading || (!selectedImage && !text)}
          >
            Share
          </Button>
        </div>

        {/* Status creation area */}
        <div 
          className="flex-1 flex flex-col justify-center items-center p-4" 
          style={{ backgroundColor: bgColor }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
              <p className="mb-2 text-sm">Adding your status...</p>
              <Progress value={progress} className="w-64 h-2" />
            </div>
          )}

          {selectedImage ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={selectedImage} 
                alt="Status preview" 
                className="max-h-full max-w-full object-contain rounded-md"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-1 bg-gray-900/70 rounded-full text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
                className="absolute bottom-8 left-0 right-0 mx-auto w-4/5 p-3 bg-gray-900/50 text-white rounded-full placeholder-gray-300 focus:outline-none text-center"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6 text-white">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
                className="w-full bg-transparent text-3xl font-bold text-center placeholder-white/70 focus:outline-none"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              />
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 border-none hover:bg-white/30"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-5 w-5 text-white" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 border-none hover:bg-white/30"
                  onClick={handleDirectImageSelect}
                >
                  <ImageIcon className="h-5 w-5 text-white" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 border-none hover:bg-white/30"
                >
                  <Edit3 className="h-5 w-5 text-white" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 border-none hover:bg-white/30"
                >
                  <Smile className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Color options */}
        <div className="p-4 flex justify-center space-x-3 border-t border-border">
          {colorOptions.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full"
              style={{ 
                backgroundColor: color,
                border: bgColor === color ? '2px solid white' : 'none',
                boxShadow: bgColor === color ? '0 0 0 2px black' : 'none'
              }}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AddStatus;
