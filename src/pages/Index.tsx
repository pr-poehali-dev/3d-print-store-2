import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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

  const catalog = [
    { name: 'Prusa i3 MK3S+', price: '85 000 ₽', specs: 'FDM • 250×210×210мм', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0b49b652-f27a-4db3-86ce-9d3c5d0a2ed2.jpg' },
    { name: 'Formlabs Form 3', price: '320 000 ₽', specs: 'SLA • 145×145×185мм', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/a01633c7-ed8d-49ad-a951-06a3a776dbf3.jpg' },
    { name: 'Ultimaker S5', price: '550 000 ₽', specs: 'FDM • 330×240×300мм', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0585aeb5-07cb-4d74-b46b-f5dd13b1ecd2.jpg' },
  ];

  const portfolio = [
    { title: 'Прототип корпуса', category: 'Промышленность', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0b49b652-f27a-4db3-86ce-9d3c5d0a2ed2.jpg' },
    { title: 'Архитектурный макет', category: 'Архитектура', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/a01633c7-ed8d-49ad-a951-06a3a776dbf3.jpg' },
    { title: 'Медицинская модель', category: 'Медицина', image: 'https://cdn.poehali.dev/projects/61ee61e5-1fe7-4922-a461-2e8fcbc230e7/files/0585aeb5-07cb-4d74-b46b-f5dd13b1ecd2.jpg' },
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
            {['Главная', 'Услуги', 'Каталог', 'Портфолио', 'Отзывы', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
            Заказать
          </Button>
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
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow text-lg px-8 py-6">
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать проект
            </Button>
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

      <section id="каталог" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">Оборудование</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-cyan">Каталог принтеров</h2>
            <p className="text-muted-foreground text-lg">Премиальное оборудование для профессионалов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {catalog.map((item, i) => (
              <Card key={i} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-105 group animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative overflow-hidden h-64">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                  <p className="text-muted-foreground mb-4">{item.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{item.price}</span>
                    <Button className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/50">
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="портфолио" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Наши работы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-purple">Портфолио</h2>
            <p className="text-muted-foreground text-lg">Проекты, которыми мы гордимся</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, i) => (
              <Card key={i} className="bg-card border-border overflow-hidden hover:border-secondary/50 transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative overflow-hidden h-80">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Badge className="mb-2 bg-secondary/80">{item.category}</Badge>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-4">
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
                    <p className="font-bold">info@3dprintlab.ru</p>
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
                    <p className="font-bold">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Адрес</p>
                    <p className="font-bold">Москва, ул. Инновационная, 42</p>
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
