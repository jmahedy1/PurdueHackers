import discord
import os
from discord.ext import commands


class PurdueHackersBot(commands.Bot):
  # Bot Initialization
  def __init__(self):
    super().__init__(command_prefix=commands.when_mentioned_or('!'),
                     description='BoilerBot',
                     intents=discord.Intents.all(),
                     application_id=os.environ['APPLICATION_ID'])

  # Sets up commands
  async def load_extensions(self) -> None:
    for filename in os.listdir("cogs"):
      if filename.endswith(".py"):
        await self.load_extension(f"cogs.{filename[:-3]}")

  async def setup_hook(self) -> None:
    self.remove_command('help')
    await self.load_extensions()
    await bot.tree.sync()


bot = PurdueHackersBot()

bot.run(os.environ['BOT_TOKEN'])
