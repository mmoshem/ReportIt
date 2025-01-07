package com.example.reportit;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class CustomeAdapter extends RecyclerView.Adapter<CustomeAdapter.MyViewHolder> {

    private ArrayList<DataModel> dataSet;
    private ArrayList<DataModel> filterdDataset;

    public CustomeAdapter(ArrayList<DataModel> dataSet) {
        this.dataSet = dataSet;
        this.filterdDataset = new ArrayList<>(dataSet);
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        TextView textViewName;
        TextView textViewVersion;
        ImageView imageView;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewName = itemView.findViewById(R.id.textView);
            textViewVersion = itemView.findViewById(R.id.textView2);
            imageView = itemView.findViewById(R.id.imageView);
        }
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardrow, parent, false);
        MyViewHolder myViewHolder = new MyViewHolder(view);

        return myViewHolder;
    }


    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {

        holder.textViewName.setText(filterdDataset.get(position).getName());
        holder.textViewVersion.setText(filterdDataset.get(position).getVersion());
        holder.imageView.setImageResource(filterdDataset.get(position).getImage());
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Fetch the name of the clicked item
                String name = filterdDataset.get(holder.getAdapterPosition()).getName();

                // Show a toast with the item name
                Toast.makeText(v.getContext(), "Clicked on: " + name, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return filterdDataset.size();
    }
    public void filter(String query) {
        filterdDataset.clear();
        if (query.isEmpty()) {
            // If query is empty, show all items
            filterdDataset.addAll(dataSet);
        } else {
            String lowerCaseQuery = query.toLowerCase().trim();
            for (DataModel item : dataSet) {
                if (item.getName().toLowerCase().startsWith(lowerCaseQuery)) {
                    filterdDataset.add(item);
                }
            }
        }
        notifyDataSetChanged(); // Notify the adapter about the data change
    }

}


