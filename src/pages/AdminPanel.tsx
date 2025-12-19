import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Edit, Trash2, Home, Users, DollarSign, Star, LogOut, BarChart3, Building2 } from 'lucide-react';

interface Homestay {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  capacity: number;
  rooms: number;
  location: string;
  distance: string;
  facilities: string[];
  categories: string[];
}

interface DashboardStats {
  totalHomestays: number;
  averageRating: string;
  totalRevenue: number;
  totalUsers: number;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHomestay, setEditingHomestay] = useState<Homestay | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    capacity: '',
    rooms: '',
    location: '',
    distance: '',
    facilities: [] as string[],
    categories: [] as string[],
    image: null as File | null
  });

  const facilityOptions = [
    'WiFi', 'AC', 'Kolam Renang', 'Dapur', 'Parkir', 'Sarapan',
    'Kamar Mandi Dalam', 'Teras', 'BBQ Area', 'Smart TV', 'Laundry',
    'Akses Pantai', 'View Gunung', 'Pemanas Ruangan', 'Guide Tour'
  ];

  const categoryOptions = categories.map(cat => ({
    key: cat.code,
    label: cat.name
  }));

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const [homestaysRes, statsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:5000/api/homestays'),
        fetch('http://localhost:5000/api/dashboard/stats'),
        fetch('http://localhost:5000/api/categories')
      ]);

      const homestaysData = await homestaysRes.json();
      const statsData = await statsRes.json();
      const categoriesData = await categoriesRes.json();

      setHomestays(homestaysData);
      setStats(statsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Gagal memuat data dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      price: '',
      capacity: '',
      rooms: '',
      location: '',
      distance: '',
      facilities: [],
      categories: [],
      image: null
    });
    setEditingHomestay(null);
  };

  const handleFacilityToggle = (facility: string) => {
    setForm(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('capacity', form.capacity);
    data.append('rooms', form.rooms);
    data.append('location', form.location);
    data.append('distance', form.distance);
    data.append('facilities', JSON.stringify(form.facilities));
    data.append('categories', JSON.stringify(form.categories));
    if (form.image) data.append('image', form.image);

    try {
      const url = editingHomestay
        ? `http://localhost:5000/api/homestays/${editingHomestay.id}`
        : 'http://localhost:5000/api/homestays';

      const res = await fetch(url, {
        method: editingHomestay ? 'PUT' : 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setSuccess(`Homestay ${editingHomestay ? 'diupdate' : 'ditambahkan'} berhasil!`);
        resetForm();
        setIsAddDialogOpen(false);
        loadDashboardData();
      } else {
        setError(result.error || `Gagal ${editingHomestay ? 'mengupdate' : 'menambah'} homestay!`);
      }
    } catch (err) {
      setError('Gagal koneksi server!');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (homestay: Homestay) => {
    setEditingHomestay(homestay);
    setForm({
      title: homestay.title,
      description: homestay.description,
      price: homestay.price.toString(),
      capacity: homestay.capacity.toString(),
      rooms: homestay.rooms.toString(),
      location: homestay.location,
      distance: homestay.distance,
      facilities: homestay.facilities,
      categories: homestay.categories,
      image: null
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus homestay ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/homestays/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (result.success) {
        setSuccess('Homestay berhasil dihapus!');
        loadDashboardData();
      } else {
        setError(result.error || 'Gagal menghapus homestay!');
      }
    } catch (err) {
      setError('Gagal koneksi server!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">WHOUSE Homestay Management</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="homestays" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Kelola Homestay
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Kelola User
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Homestay</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalHomestays || 0}</div>
                  <p className="text-xs text-muted-foreground">Properti aktif</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating Rata-rata</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.averageRating || 0}</div>
                  <p className="text-xs text-muted-foreground">Dari semua properti</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">User administrator</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Homestays */}
            <Card>
              <CardHeader>
                <CardTitle>Homestay Terbaru</CardTitle>
                <CardDescription>Daftar homestay yang baru ditambahkan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homestays.slice(0, 5).map((homestay) => (
                    <div key={homestay.id} className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:5000${homestay.image}`}
                        alt={homestay.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{homestay.title}</h4>
                        <p className="text-sm text-gray-600">{homestay.location}</p>
                        <p className="text-sm font-medium text-green-600">Rp {homestay.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{homestay.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homestays Management Tab */}
          <TabsContent value="homestays" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Kelola Homestay</h2>
                <p className="text-gray-600">Tambah, edit, dan hapus properti homestay</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Homestay
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingHomestay ? 'Edit Homestay' : 'Tambah Homestay Baru'}</DialogTitle>
                    <DialogDescription>
                      Masukkan detail homestay yang akan {editingHomestay ? 'diupdate' : 'ditambahkan'}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Judul Homestay</Label>
                        <Input
                          id="title"
                          value={form.title}
                          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Villa Bali Indah"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <Input
                          id="location"
                          value={form.location}
                          onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Ubud, Bali"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Deskripsikan homestay ini..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Harga per Malam</Label>
                        <Input
                          id="price"
                          type="number"
                          value={form.price}
                          onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="1500000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance">Jarak dari Pusat</Label>
                        <Input
                          id="distance"
                          value={form.distance}
                          onChange={(e) => setForm(prev => ({ ...prev, distance: e.target.value }))}
                          placeholder="2.5 km dari pusat kota"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Kapasitas</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={form.capacity}
                          onChange={(e) => setForm(prev => ({ ...prev, capacity: e.target.value }))}
                          placeholder="6"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rooms">Jumlah Kamar</Label>
                        <Input
                          id="rooms"
                          type="number"
                          value={form.rooms}
                          onChange={(e) => setForm(prev => ({ ...prev, rooms: e.target.value }))}
                          placeholder="3"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Gambar</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setForm(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
                          required={!editingHomestay}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fasilitas</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {facilityOptions.map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={facility}
                              checked={form.facilities.includes(facility)}
                              onChange={() => handleFacilityToggle(facility)}
                              className="rounded"
                            />
                            <Label htmlFor={facility} className="text-sm">{facility}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Kategori</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryOptions.map((category) => (
                          <div key={category.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={category.key}
                              checked={form.categories.includes(category.key)}
                              onChange={() => handleCategoryToggle(category.key)}
                              className="rounded"
                            />
                            <Label htmlFor={category.key} className="text-sm">{category.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {success && <Alert><AlertDescription className="text-green-600">{success}</AlertDescription></Alert>}
                    {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingHomestay ? 'Update' : 'Tambah'} Homestay
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gambar</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homestays.map((homestay) => (
                      <TableRow key={homestay.id}>
                        <TableCell>
                          <img
                            src={`http://localhost:5000${homestay.image}`}
                            alt={homestay.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{homestay.title}</TableCell>
                        <TableCell>{homestay.location}</TableCell>
                        <TableCell>Rp {homestay.price.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {homestay.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(homestay)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(homestay.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kelola User Admin</CardTitle>
                <CardDescription>Manajemen akun administrator sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fitur manajemen user akan ditambahkan di versi selanjutnya</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;