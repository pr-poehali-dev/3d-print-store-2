import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    technology: '',
    material: '',
    description: '',
    file: null as File | null
  });

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let fileBase64 = '';
      let fileName = '';
      
      if (orderForm.file) {
        fileName = orderForm.file.name;
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(orderForm.file!);
        });
      }
      
      const response = await fetch('https://functions.poehali.dev/7dfafe38-048e-4180-9807-6466b4d54fc5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone,
          technology: orderForm.technology,
          material: orderForm.material,
          description: orderForm.description,
          file_base64: fileBase64,
          file_name: fileName
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Заказ отправлен!',
          description: `Заказ №${data.order_id} успешно создан. Мы свяжемся с вами в ближайшее время.`,
        });
        setOrderDialogOpen(false);
        setOrderForm({
          name: '',
          email: '',
          phone: '',
          technology: '',
          material: '',
          description: '',
          file: null
        });
      } else {
        throw new Error(data.error || 'Ошибка при отправке заказа');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось отправить заказ',
        variant: 'destructive'
      });
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { icon: 'Cpu', title: '3D Печать', description: 'FDM, SLA, SLS технологии для любых проектов' },
    { icon: 'Box', title: '3D Моделирование', description: 'Разработка моделей под ваши требования' },
    { icon: 'Sparkles', title: 'Постобработка', description: 'Шлифовка, покраска, финишная обработка' },
    { icon: 'Scan', title: '3D Сканирование', description: 'Оцифровка реальных объектов' },
  ];



  const reviews = [
    { name: 'Алексей Иванов', rating: 5, text: 'Отличное качество печати! Заказывали прототип корпуса для электроники. Все детали четкие, сборка идеальная.', avatar: 'АИ', project: 'Корпус устройства', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0b49b652-f27a-4db3-86ce-9d3c5d0a2ed2.jpg' },
    { name: 'Мария Соколова', rating: 5, text: 'Профессиональный подход к каждой детали. Сделали архитектурный макет за 3 дня. Рекомендую!', avatar: 'МС', project: 'Архитектурный макет', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/a01633c7-ed8d-49ad-a951-06a3a776dbf3.jpg' },
    { name: 'Дмитрий Петров', rating: 5, text: 'Быстро и качественно напечатали серию деталей для стенда. Цены адекватные, сроки соблюдены.', avatar: 'ДП', project: 'Выставочный стенд', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0585aeb5-07cb-4d74-b46b-f5dd13b1ecd2.jpg' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Layers" className="text-primary" size={32} />
            <span className="text-2xl font-bold glow-cyan">3D PRINT LAB</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Главная', 'Услуги', 'Отзывы', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
          <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                Заказать
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Заказать 3D печать</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы рассчитаем стоимость вашего проекта
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@example.com"
                    required
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="technology">Технология печати *</Label>
                    <Select required onValueChange={(value) => setOrderForm({...orderForm, technology: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите технологию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fdm">FDM (пластик)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material">Материал</Label>
                    <Select onValueChange={(value) => setOrderForm({...orderForm, material: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите материал" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pla">PLA</SelectItem>
                        <SelectItem value="abs">ABS</SelectItem>
                        <SelectItem value="petg">PETG</SelectItem>
                        <SelectItem value="nylon">Nylon</SelectItem>
                        <SelectItem value="resin">Фотополимер</SelectItem>
                        <SelectItem value="tpu">TPU (гибкий)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание проекта *</Label>
                  <Textarea
                    id="description"
                    placeholder="Опишите, что нужно напечатать: размеры, количество, цвет, особые требования..."
                    rows={4}
                    required
                    value={orderForm.description}
                    onChange={(e) => setOrderForm({...orderForm, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Загрузить 3D модель (STL, OBJ)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".stl,.obj,.step,.stp"
                    onChange={(e) => setOrderForm({...orderForm, file: e.target.files?.[0] || null})}
                  />
                  <p className="text-xs text-muted-foreground">Если у вас нет модели, мы можем её создать</p>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50 px-4 py-2 animate-fade-in">
            Технологии будущего
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-6 glow-cyan animate-fade-in" style={{ animationDelay: '0.2s' }}>
            3D ПЕЧАТЬ<br />НОВОГО ПОКОЛЕНИЯ
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Воплощаем ваши идеи в реальность с помощью передовых технологий 3D печати
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow text-lg px-8 py-6">
                  <Icon name="Rocket" className="mr-2" size={20} />
                  Начать проект
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6">
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть видео
            </Button>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Наши возможности</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-purple">Услуги</h2>
            <p className="text-muted-foreground text-lg">Полный цикл 3D производства</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:border-glow group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">Технологии</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-cyan">Наши возможности</h2>
            <p className="text-muted-foreground text-lg">Современное оборудование и материалы</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img src="https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/6c1312a0-5f87-4776-942e-eacb32c57114.jpg" alt="FDM технология" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold mb-2">FDM печать</h3>
                  <p className="text-sm text-muted-foreground">Послойное нанесение пластика. Идеально для прототипов и функциональных деталей.</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Точность до 0.1 мм</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Размеры до 300×300×400 мм</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">PLA, ABS, PETG, TPU</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img src="https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/b7adaf62-3d3f-4768-8b90-0850efa5bd40.jpg" alt="SLA технология" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold mb-2">SLA печать</h3>
                  <p className="text-sm text-muted-foreground">Фотополимерная смола высокой детализации. Для ювелирки и медицины.</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Точность до 0.025 мм</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Гладкая поверхность</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Прозрачные материалы</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img src="https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/39b0dce0-4d63-465d-897e-4e82ce881512.jpg" alt="SLS технология" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold mb-2">SLS печать</h3>
                  <p className="text-sm text-muted-foreground">Лазерное спекание порошка. Максимальная прочность и сложные формы.</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Без поддержек</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Высокая прочность</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span className="text-sm">Nylon, TPU, композиты</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 glow-purple">Почему выбирают нас</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Скорость производства</h4>
                    <p className="text-muted-foreground">Печатаем прототипы за 24 часа. Серийные партии — от 3 дней.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Качество гарантировано</h4>
                    <p className="text-muted-foreground">Контроль на каждом этапе. Переделаем бесплатно при браке.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Экспертная поддержка</h4>
                    <p className="text-muted-foreground">Поможем с выбором технологии и оптимизацией модели.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="DollarSign" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Прозрачное ценообразование</h4>
                    <p className="text-muted-foreground">Точный расчёт стоимости до начала работ. Без скрытых платежей.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0b49b652-f27a-4db3-86ce-9d3c5d0a2ed2.jpg" alt="3D принтер" className="rounded-2xl border-2 border-primary/30 shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-primary/20 backdrop-blur-sm rounded-xl p-6 border border-primary/50">
                <div className="text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Выполненных проектов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Тарифы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-purple">Примерная стоимость</h2>
            <p className="text-muted-foreground text-lg">Цены зависят от сложности модели и тиража</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Cpu" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">FDM печать</h3>
                  <p className="text-muted-foreground text-sm">Пластиковые детали</p>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">от 50₽</div>
                  <div className="text-sm text-muted-foreground">за грамм</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">PLA, ABS, PETG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Срок: 1-3 дня</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Точность 0.1-0.2мм</span>
                  </div>
                </div>
                <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/50">
                      Заказать
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/50 border-2 hover:border-primary transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">Популярно</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Sparkles" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">SLA печать</h3>
                  <p className="text-muted-foreground text-sm">Высокая детализация</p>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">от 150₽</div>
                  <div className="text-sm text-muted-foreground">за грамм</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Фотополимерная смола</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Срок: 2-4 дня</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Точность 0.025мм</span>
                  </div>
                </div>
                <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Заказать
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Zap" className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">SLS печать</h3>
                  <p className="text-muted-foreground text-sm">Промышленная прочность</p>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">от 300₽</div>
                  <div className="text-sm text-muted-foreground">за грамм</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Nylon, TPU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Срок: 3-7 дней</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">Без поддержек</span>
                  </div>
                </div>
                <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/50">
                      Заказать
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">* Точная стоимость рассчитывается индивидуально после анализа модели</p>
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">Что говорят клиенты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-cyan">Отзывы</h2>
            <p className="text-muted-foreground text-lg">Реальные результаты наших проектов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary/20 text-primary">{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img src={review.image} alt={review.project} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent p-3">
                      <Badge className="bg-primary/80">{review.project}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Свяжитесь с нами</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-purple">Контакты</h2>
            <p className="text-muted-foreground text-lg">Готовы обсудить ваш проект</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-bold">rutra93525@gmail.com</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-bold">+7 919 623 25 80</p>
                  </div>
                </div>
              </Card>

            </div>
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-6">О нас</h3>
              <p className="text-muted-foreground mb-4">
                3D Print Lab - ведущая компания в области аддитивного производства. Мы специализируемся на 3D печати, моделировании и прототипировании.
              </p>
              <p className="text-muted-foreground mb-6">
                Наша команда профессионалов использует передовые технологии для создания высококачественных изделий любой сложности.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="Send" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 3D Print Lab. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;